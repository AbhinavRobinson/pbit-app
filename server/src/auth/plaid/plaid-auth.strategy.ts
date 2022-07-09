import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PlaidAuthService } from './plaid-auth.service';

@Injectable()
export class PlaidAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: PlaidAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
