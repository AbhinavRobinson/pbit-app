import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(configuration().database.host as string),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
