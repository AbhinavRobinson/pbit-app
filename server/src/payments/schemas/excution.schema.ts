import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Execution {
  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true })
  executionStatus: string;
}
