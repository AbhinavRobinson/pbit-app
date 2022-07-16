import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  collection: 'Chain',
})
export class Chain {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ requried: true, unique: true })
  chainId: string;
}
