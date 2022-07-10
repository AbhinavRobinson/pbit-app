import { Provider } from 'src/users/schemas/user.types';

export class LoginUserDto {
  provider: Provider;
  username: string;
  password: string;
}
