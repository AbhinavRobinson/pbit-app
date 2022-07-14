import { ApiProperty } from '@nestjs/swagger';

export class SendMailDTO {
  @ApiProperty({ description: 'Gmail User Id' })
  userId: string;
  @ApiProperty()
  from_mail: string;
  @ApiProperty()
  to_email: string;
  @ApiProperty()
  subject: string;
  @ApiProperty({ description: 'text/plain format' })
  mail_data: string;
}
