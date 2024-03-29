import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';

@Module({
  imports: [],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
