import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Request } from 'express';
import { GoogleOauthGuard } from 'src/auth/google/google-oauth.guard';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get()
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(GoogleOauthGuard)
  async whoAmI(req: Request): Promise<User> {
    const { body } = req;
    return this.usersService.findOne(body.user.id);
  }
}
