import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Provider } from './user.types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  provider: Provider;

  @Prop({ required: true })
  providerId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  username: string;

  // Only used for local strategy
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
