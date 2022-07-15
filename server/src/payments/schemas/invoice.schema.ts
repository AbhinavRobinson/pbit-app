import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Chain } from './chain.schema';
import { Execution } from './excution.schema';

const DAY = 60 * 60 * 24;

export enum Frequency {
  Single,
  Daily,
  Weekly,
  Monthly,
  Quarterly,
  Yearly,
}

@Schema({
  timestamps: true,
  collection: 'Invoice',
})
export class Invoice {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Chain', required: true })
  chainId: Chain;

  @ApiProperty()
  @Prop({ required: true })
  transactionHash: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @ApiProperty()
  @Prop({ required: true })
  amount: string;

  @ApiProperty()
  @Prop({ required: true })
  startingTime: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  paymentParameter: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  paymentNonce: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  payer: User | string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  payee: User | string;

  @ApiProperty()
  @Prop({ required: true })
  frequency: Frequency;

  @ApiProperty()
  @Prop({ required: true })
  expiry: string;

  @ApiProperty()
  @Prop({ required: true })
  durationForRetiresBeforeFailure: string;

  @ApiProperty()
  @Prop({ required: true })
  currency: string;

  @ApiProperty({ required: false })
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Execution' }],
    required: false,
    default: [],
  })
  executions: Execution[];

  @ApiProperty()
  @Prop({ required: true, default: 1 })
  numberOfRetries: number;
}

export type InvoiceDocument = Invoice & Document;
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
