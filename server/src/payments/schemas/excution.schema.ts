import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Execution {
  @Prop({ required: true })
  transaction: String;

  @Prop({ required: true })
  executionStatus: string;
}
