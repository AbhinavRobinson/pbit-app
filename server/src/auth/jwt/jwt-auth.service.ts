import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  decodeAndExtractId(authHeader: string): number {
    const base64Payload = authHeader.split(' ')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const decodedPayload: JwtPayload = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    return decodedPayload.sub;
  }
}
