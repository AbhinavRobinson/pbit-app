import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'Chain',
})
export class Chain {
  @Prop()
  name: string;

  @Prop({ requried: true, unique: true })
  chainId: string;
}
