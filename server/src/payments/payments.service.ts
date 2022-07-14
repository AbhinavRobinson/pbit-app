/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async findOne(filter: FilterQuery<InvoiceDocument>): Promise<Invoice> {
    return await this.invoiceModel.findOne(filter).exec();
  }

  async findOneAndUpdate(
    filter: FilterQuery<InvoiceDocument>,
    params: UpdateQuery<InvoiceDocument>,
  ): Promise<Invoice> {
    return await this.invoiceModel.findOneAndUpdate(filter, params).exec();
  }

  async create(doc: Invoice | InvoiceDocument): Promise<Record<string, any>> {
    return await (await this.invoiceModel.create(doc)).save();
  }

  async createMany(
    docs: (Invoice | InvoiceDocument)[],
  ): Promise<Record<string, any>[]> {
    return await this.invoiceModel.insertMany(docs);
  }
}
