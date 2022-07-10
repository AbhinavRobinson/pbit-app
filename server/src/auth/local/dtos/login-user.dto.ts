import { Provider } from 'src/users/schemas/user.types';

export class LoginLocalUserDto {
  provider: Provider;
  username: string;
  password: string;
}
