import { Provider } from '../../../users/schemas/user.types';

export class CreateGoogleUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
