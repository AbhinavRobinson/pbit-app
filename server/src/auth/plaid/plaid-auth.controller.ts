import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { PlaidAuthGuard } from './plaid-auth.guard';
import { PlaidAuthService } from './plaid-auth.service';

@Controller('auth/plaid')
export class PlaidAuthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private plaidAuthService: PlaidAuthService,
  ) {}

  @Post('login')
  @UseGuards(PlaidAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    res.cookie('jwt', this.jwtAuthService.login(req.user));
    return req.user;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Omit<User, 'password'>> {
    const result: User = await this.plaidAuthService.create(createUserDto);
    res.cookie('jwt', this.jwtAuthService.login(result));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = result;
    return rest;
  }
}
