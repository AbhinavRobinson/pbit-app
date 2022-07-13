import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/roles/roles.enum';

export type Provider = 'google' | 'plaid';

export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  provider: Provider;
  @ApiProperty()
  username: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty({ required: false, description: 'Auto generated if null' })
  providerId?: string;
  @ApiProperty({ required: false, default: null })
  name?: string;
  @ApiProperty({ description: 'Required for local strategy' })
  password?: string;
  @ApiProperty({ required: false, default: [Role.User] })
  role?: Role[];
}
