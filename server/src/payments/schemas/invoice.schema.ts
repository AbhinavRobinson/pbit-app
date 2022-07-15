import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User as IUser } from 'src/users/schemas/user.schema';
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

type IFrequency = keyof typeof Frequency;

export const FrequencyTimeObject: { [Key in IFrequency]: number } =
  Object.fromEntries(
    (Object.keys(Frequency) as Array<IFrequency>).map((k) => {
      const _d = 60 * 60 * 24;
      switch (k) {
        case 'Single':
          return [k, 0];
        case 'Daily':
          return [k, _d * 1];
        case 'Weekly':
          return [k, _d * 7];
        case 'Monthly':
          return [k, _d * 30];
        case 'Quarterly':
          return [k, _d * 90];
        case 'Yearly':
          return [k, _d * 360];
        default:
          return [k, 0]; // default to single txn behaviour.
      }
    }),
  ) as { [Key in IFrequency]: number };

class User extends IUser {
  // ! extention will break schema.
  // @ApiProperty()
  // @Prop()
  // address: string;
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

  @ApiProperty({ type: User })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  payer: User;

  @ApiProperty({ type: User })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  payee: User;

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
