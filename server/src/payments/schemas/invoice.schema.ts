import { Prop, Schema } from '@nestjs/mongoose';
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
  @Prop({ required: true })
  chainId: Chain;

  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true })
  createdBy: User;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  startingTime: string;

  @Prop({ required: true, unique: true })
  paymentParameter: string;

  @Prop({ required: true, unique: true })
  paymentNonce: string;

  @Prop({ required: true })
  payer: User | string;

  @Prop({ required: true })
  payee: User | string;

  @Prop({ required: true })
  frequency: Frequency;

  @Prop({ required: true })
  expiry: string;

  @Prop({ required: true })
  durationForRetiresBeforeFailure: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: false, default: [] })
  executions: Execution[];

  @Prop({ required: true, default: 1 })
  numberOfRetries: number;
}
