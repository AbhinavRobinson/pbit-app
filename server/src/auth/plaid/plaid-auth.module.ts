import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { PlaidAuthController } from './plaid-auth.controller';
import { PlaidAuthService } from './plaid-auth.service';
import { PlaidAuthStrategy } from './plaid-auth.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtAuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PlaidAuthController],
  providers: [PlaidAuthService, PlaidAuthStrategy],
})
export class PlaidAuthModule {}
