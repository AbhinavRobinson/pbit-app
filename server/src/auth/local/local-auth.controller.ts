import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { CreateLocalUserDto } from './dtos/create-user-dto';
import { LoginLocalUserDto } from './dtos/login-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalAuthService } from './local-auth.service';

@Controller('auth/local')
export class LocalAuthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private localAuthService: LocalAuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginLocalUserDto) {
    return this.jwtAuthService.signedAccessToken(user);
  }

  @Post('register')
  public async register(
    @Body() createUserDto: CreateLocalUserDto,
  ): Promise<Record<string, any>> {
    const result = await this.localAuthService.create(createUserDto);
    if (result) {
      return this.jwtAuthService.signedAccessToken(createUserDto);
    }
    return new HttpException('User Already Exsists', HttpStatus.BAD_REQUEST);
  }
}
