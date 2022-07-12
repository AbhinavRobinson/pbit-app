import { MailModule } from './mail/mail.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../utils/configuration';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MailModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRoot(configuration().database.host as string),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
