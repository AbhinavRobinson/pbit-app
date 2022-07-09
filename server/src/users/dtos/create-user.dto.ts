import { Provider } from '../schemas/user.types';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
