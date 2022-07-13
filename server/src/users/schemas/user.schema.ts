import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Provider } from './user.types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  provider: Provider;

  @ApiProperty()
  @Prop({ required: true })
  providerId: string;

  @ApiProperty()
  @Prop({ required: true })
  username: string;

  @ApiProperty({ required: false, default: null })
  @Prop()
  name: string;

  // Only used for local strategy
  @ApiProperty({ description: 'Required for local strategy' })
  @Prop()
  password: string;

  // Authorization
  @ApiProperty({ required: false, default: false })
  @Prop({ required: false, default: false })
  admin: boolean;

  @ApiProperty({ required: false, default: null })
  @Prop({ required: false, default: null })
  creator: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
