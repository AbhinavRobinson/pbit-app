import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Chain {
  @Prop()
  name: string;

  @Prop({ requried: true, unique: true })
  chainId: string;
}
