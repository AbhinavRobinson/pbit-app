import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetAuthId } from 'src/auth/jwt/jwt-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Post('whoami')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@GetAuthId() id: string): Promise<User> {
    return this.usersService.findOne({ id: id.toString() });
  }
}
