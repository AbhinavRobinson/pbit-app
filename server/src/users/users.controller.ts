import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetAuthId } from 'src/auth/jwt/jwt-auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { RoleUpdateDTO } from './dtos/role-update.dto';
import { UserWithoutPassword } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@GetAuthId() id: string): Promise<UserWithoutPassword> {
    if (!id) {
      return null;
    }
    return await this.usersService.findOne({ id });
  }

  @Post('access/update/:id')
  @Roles(Role.Admin)
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
