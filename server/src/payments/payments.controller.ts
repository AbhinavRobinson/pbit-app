/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateInvoiceDTO } from './dtos/create-invoice.dto';
import { PaymentsService } from './payments.service';
import { Invoice } from './schemas/invoice.schema';

@Controller('invoice')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles(Role.Creator)
  @UseGuards(RolesGuard)
  async createInvoice(
    @Body() dto: CreateInvoiceDTO,
  ): Promise<Record<string, any>> {
    return await this.paymentsService.create(dto);
  }

  @Get(':chainId/:txnHash')
  async findInvoice(
    @Param('chainId') chainId: string,
    @Param('txnHash') txnHash: string,
  ): Promise<Invoice> {
    return await this.paymentsService.findOne({ txnHash, chainId });
  }
}
