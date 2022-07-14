import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'Execution',
})
export class Execution {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' })
  invoiceId: string;

  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true })
  executionStatus: string;
}
