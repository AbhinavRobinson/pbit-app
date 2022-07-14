import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import type { GaxiosResponse } from 'gaxios';
import { gmail_v1 } from 'googleapis';
import { SendMailDTO } from './dtos/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  async postMail(
    @Body() params: SendMailDTO,
  ): Promise<GaxiosResponse<gmail_v1.Schema$Message> | 500> {
    return this.mailService.send_mail(params);
  }

  @Get('/:userId')
  async listLabels(@Param('userId') userId: string) {
    this.mailService.listLabels(userId);
    return;
  }
}
