import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Chain } from './chain.schema';
import { Execution } from './excution.schema';

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
})
export class Invoice {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chain', required: true })
  chainId: Chain;

  @Prop({ required: true })
  transactionHash: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  startingTime: string;

  @Prop({ required: true, unique: true })
  paymentParameter: string;

  @Prop({ required: true, unique: true })
  paymentNonce: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  payer: User | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  payee: User | string;

  @Prop({ required: true })
  frequency: Frequency;

  @Prop({ required: true })
  expiry: string;

  @Prop({ required: true })
  durationForRetiresBeforeFailure: string;

  @Prop({ required: true })
  currency: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Execution',
    required: false,
    default: [],
  })
  executions: Execution[];

  @Prop({ required: true, default: 1 })
  numberOfRetries: number;
}
