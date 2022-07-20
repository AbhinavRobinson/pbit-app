import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'Execution',
})
export class Execution {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Invoice' })
  invoiceId: string;

  @ApiProperty()
  @Prop({ required: true })
  transactionHash: string;

  @ApiProperty()
  @Prop({ required: true })
  executionStatus: string;
}
