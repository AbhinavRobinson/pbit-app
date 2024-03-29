import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LocalAuthService } from './local-auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private localAuthService: LocalAuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Record<string, any>> {
    const user = await this.localAuthService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
