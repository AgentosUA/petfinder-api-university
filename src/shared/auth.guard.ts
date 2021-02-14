import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const decoded = verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
      req.authData = decoded;
      return req;  
    } catch (error) {
      throw new UnauthorizedException('Авторизуйтесь для продовження операцїі!');
    }
    
  }
}

