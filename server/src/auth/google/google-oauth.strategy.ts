import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleOauthService } from './google-oauth.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly googleOauthService: GoogleOauthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
  ): Promise<User> {
    const { id, name, emails } = profile;

    let user: User = await this.userModel
      .findOne({
        provider: 'google',
        providerId: id,
      })
      .exec();
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
