import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthService } from './google-oauth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    JwtAuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy, GoogleOauthService],
})
export class GoogleOauthModule {}
