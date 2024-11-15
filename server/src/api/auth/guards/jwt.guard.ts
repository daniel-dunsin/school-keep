import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDocument } from 'src/api/user/schemas/user.schema';
import { IsPublic } from 'src/core/decorators/auth.decoractor';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const ctx = context.switchToHttp();
      const isPublic = this.reflector.get(IsPublic, context.getHandler());

      if (isPublic) {
        return true;
      }
      const req = ctx.getRequest<Request>();
      const isWebHeader = req.headers['is_web'];

      let accessToken: string;

      if (isWebHeader) {
        const token = req.headers['authorization'];

        if (!token || !token.startsWith('Bearer ')) {
          throw new UnauthorizedException('Bearer token not found');
        }

        accessToken = token.split(' ')[1];
      } else {
        accessToken = req.cookies['x-school-keep-bearer'];
      }

      if (!accessToken)
        throw new UnauthorizedException('Access token not found');

      const user = await this.jwtService.verifyAsync<UserDocument>(accessToken);

      req.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
