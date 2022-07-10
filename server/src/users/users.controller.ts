import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtAuthService } from 'src/auth/jwt/jwt-auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(JwtAuthService) private jwtAuthService: JwtAuthService,
  ) {}

  @Post('whoami')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@Req() req: Request): Promise<User> {
    const { jwt } = req.cookies;
    const id = this.jwtAuthService.decodeAndExtractId(jwt as string);
    return this.usersService.findOne({ id: id.toString() });
  }
}
