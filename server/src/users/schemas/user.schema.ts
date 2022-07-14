import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Role } from 'src/auth/roles/roles.enum';

export type UserDocument = User & Document;
export type UserWithoutPassword = Omit<User, 'password'>;

export type Provider = 'google' | 'plaid';

@Schema({ timestamps: true })
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
  @ApiProperty({ required: false, default: [Role.User] })
  @Prop({ required: false, default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
