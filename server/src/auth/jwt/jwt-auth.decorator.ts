import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-auth.strategy';

export const GetAuthId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const token =
        request?.cookies?.jwt?.split(' ')[1] ||
        ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      const decodedPayload: JwtPayload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString(),
      ) as JwtPayload;
      return decodedPayload.sub;
    } catch (e) {
      return null;
    }
  },
);
