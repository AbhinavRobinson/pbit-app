import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetAuthId } from 'src/auth/jwt/jwt-auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { RoleUpdateDTO } from './dtos/role-update.dto';
import { UserWithoutPassword } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Post('whoami')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@GetAuthId() id: string): Promise<UserWithoutPassword> {
    return await this.usersService.findOne({ id: id.toString() });
  }

  @Post('access/update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRoles(
    @Param('id') id: string,
    @Body() roleUpdateDTO: RoleUpdateDTO,
  ): Promise<UserWithoutPassword> {
    return await this.usersService.findOneAndUpdate(
      { id },
      {
        roles: roleUpdateDTO,
      },
    );
  }
}
