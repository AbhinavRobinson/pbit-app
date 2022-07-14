import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private jwtSerivce: JwtAuthService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { cookies } = ctx.switchToHttp().getRequest();
    const id = this.jwtSerivce.decodeAndExtractId(cookies.jwt);
    const user = await this.usersService.findOne({ id });
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
