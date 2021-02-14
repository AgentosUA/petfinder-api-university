import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthData = createParamDecorator(
  (data: UserAuthData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.authData;
  },
);