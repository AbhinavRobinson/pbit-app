import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
