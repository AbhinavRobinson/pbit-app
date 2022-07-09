import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Request } from 'express';
import { GoogleOauthGuard } from 'src/auth/google/google-oauth.guard';
import { JwtAuthService } from 'src/auth/jwt/jwt-auth.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(JwtAuthService) private jwtAuthService: JwtAuthService,
  ) {}

  @Get()
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(GoogleOauthGuard)
  async whoAmI(req: Request): Promise<User> {
    const { jwt } = req.headers;
    const id = this.jwtAuthService.decodeAndExtractId(jwt as string);
    return this.usersService.findOne({ id: id.toString() });
  }
}
