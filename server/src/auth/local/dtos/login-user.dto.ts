import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'src/users/schemas/user.types';

export class LoginLocalUserDto {
  @ApiProperty({ description: 'Must be local' })
  provider: Provider;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
