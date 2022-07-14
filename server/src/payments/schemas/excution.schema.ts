import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'Execution',
})
export class Execution {
  @Prop({ type: Types.ObjectId, ref: 'Invoice' })
  invoiceId: string;

  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true })
  executionStatus: string;
}
