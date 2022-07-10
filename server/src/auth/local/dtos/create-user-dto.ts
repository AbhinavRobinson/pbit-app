import { Provider } from 'src/users/schemas/user.types';

export class CreateLocalUserDto {
  provider: Provider;
  username: string;
  name: string;
  password: string;
}
