import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { LoginUserDto } from './dtos/login-user.dto';
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
  async login(@Body() user: LoginUserDto) {
    return this.jwtAuthService.login(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    await this.plaidAuthService.create(createUserDto);
    return this.jwtAuthService.login(createUserDto);
  }
}
