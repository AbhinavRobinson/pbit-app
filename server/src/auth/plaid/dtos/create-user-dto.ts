import { Provider } from 'src/users/schemas/user.types';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
  password: string;
}
