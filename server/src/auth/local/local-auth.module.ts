import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { LocalAuthController } from './local-auth.controller';
import { LocalAuthService } from './local-auth.service';
import { LocalAuthStrategy } from './local-auth.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtAuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [LocalAuthController],
  providers: [LocalAuthService, LocalAuthStrategy],
})
export class LocalAuthModule {}
