export type Provider = 'google' | 'plaid';

export class User {
  id: number;
  provider: Provider;
  providerId?: string;
  username: string;
  name?: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}
