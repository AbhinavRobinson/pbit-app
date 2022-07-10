import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../../../users/schemas/user.types';

export class CreateGoogleUserDto {
  @ApiProperty({ description: 'Must be google' })
  provider: Provider;
  @ApiProperty()
  providerId: string;
  @ApiProperty()
  username: string;
  @ApiProperty({ required: false })
  name: string;
}
