import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'src/users/schemas/user.types';

export class CreateLocalUserDto {
  @ApiProperty({ description: 'Must be local' })
  provider: Provider;
  @ApiProperty()
  username: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty()
  password: string;
}
