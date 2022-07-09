import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { GoogleOauthService } from './google-oauth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly googleOauthService: GoogleOauthService,
  ) {
    super({
      clientID: configService.get<string>('google.oauth.id'),
      clientSecret: configService.get<string>('google.oauth.secret'),
      callbackURL: configService.get<string>('google.oauth.redirecturl'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;

    let user = await this.usersService.findOne({
      provider: 'google',
      providerId: id,
    });
    if (!user) {
      user = await this.googleOauthService.create({
        provider: 'google',
        providerId: id,
        name: name.givenName,
        username: emails[0].value,
      });
    }

    return user;
  }
}
