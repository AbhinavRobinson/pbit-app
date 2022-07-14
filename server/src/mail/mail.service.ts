import { Injectable } from '@nestjs/common';
import fs from 'fs';
import readline from 'readline';
import { join } from 'path';
import MimeText from 'mimetext';
import { gmail_v1, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { GaxiosResponse } from 'gaxios';
import { SendMailDTO } from './dtos/send-mail.dto';

@Injectable()
export class MailService {
  private SCOPES: string[];
  private TOKEN_PATH: string;
  private CRED_FILE: string;
  private TOKEN_FILE: string;
  private MESSAGE_TYPE: MimeText.TextFormat;
  private ACCESS_TYPE: string;
  private GOOGLE_VERSION: 'v1';
  private REL_PATH: string;

  constructor() {
    this.REL_PATH = '..';
    this.SCOPES = [
      'https://mail.google.com',
      'https://www.googleapis.com/auth/drive',
    ];
    this.TOKEN_FILE = 'token.json';
    this.TOKEN_PATH = join(join(__dirname, this.REL_PATH), this.TOKEN_FILE);
    this.CRED_FILE = 'credentials.json';
    this.MESSAGE_TYPE = 'text/plain';
    this.ACCESS_TYPE = 'offline';
    this.GOOGLE_VERSION = 'v1';
  }

  private make_mime(
    to: string,
    from: string,
    subject: string,
    msg: string,
  ): string {
    const message = MimeText.createMimeMessage();
    message.setSender(from);
    message.setRecipient(to);
    message.setSubject(subject);
    message.setMessage(this.MESSAGE_TYPE, msg);
    return message.asEncoded();
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  private getNewToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
    return new Promise<OAuth2Client>((resolve, reject) => {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: this.ACCESS_TYPE,
        scope: this.SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code: any) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token: any) => {
          if (err) {
            reject(err);
            return console.error('Error retrieving access token', err);
          }
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err: any) => {
            if (err) {
              reject(err);
              return console.error(err);
            }
            console.log('Token stored to', this.TOKEN_PATH);
          });
          resolve(oAuth2Client);
        });
      });
    });
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  private async authorize(credentials: {
    installed: {
      client_secret: string;
      client_id: string;
      redirect_uris: string[];
    };
  }): Promise<OAuth2Client> {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    // Check if we have previously stored a token.
    let token: string | Buffer;
    try {
      token = await fs.promises.readFile(this.TOKEN_PATH);
    } catch (err) {
      if (err) return this.getNewToken(oAuth2Client);
    }
    oAuth2Client.setCredentials(JSON.parse(token!.toString()));
    return oAuth2Client;
  }

  private async getOAuth(): Promise<OAuth2Client> {
    try {
      const content = await fs.promises.readFile(
        join(join(__dirname, this.REL_PATH), this.CRED_FILE),
      );
      const OAuth = await this.authorize(JSON.parse(content.toString()));
      return OAuth;
    } catch (err) {
      console.log(`Error reading ${this.CRED_FILE}, ${err}`);
      throw new Error('Erroe free');
    }
  }

  async listLabels(userId: string): Promise<void> {
    const auth = await this.getOAuth();
    const gmail = google.gmail({ version: this.GOOGLE_VERSION, auth });
    gmail.users.labels.list(
      {
        userId,
      },
      (err, res: any) => {
        if (err) return console.log('The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
          console.log('Labels:');
          labels.forEach((label: any) => {
            console.log(`- ${label.name}`);
          });
        } else {
          console.log('No labels found.');
        }
      },
    );
  }

  async send_mail(
    params: SendMailDTO,
  ): Promise<GaxiosResponse<gmail_v1.Schema$Message> | 500> {
    const auth = await this.getOAuth();
    const { userId, from_mail, to_email, subject, mail_data } = params;
    try {
      console.log({ to_email, from_mail, subject, mail_data });
      let raw = this.make_mime(to_email, from_mail, subject, mail_data);
      const gmail = google.gmail({ version: this.GOOGLE_VERSION, auth });
      return await gmail.users.messages.send({
        userId,
        requestBody: { raw: raw },
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}
