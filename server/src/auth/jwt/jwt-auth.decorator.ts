import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwt-auth.strategy';

export const GetAuthId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const base64Payload = request.cookies.jwt.split(' ')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const decodedPayload: JwtPayload = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    return decodedPayload.sub;
  },
);
