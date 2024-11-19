import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDocument } from 'src/api/user/schemas/user.schema';
import {
  AdminRolesDec,
  IsPublic,
  RolesDec,
} from 'src/core/decorators/auth.decoractor';
import { AuthService } from '../auth.service';
import { Roles } from 'src/api/user/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const ctx = context.switchToHttp();
      const isPublic = this.reflector.get(IsPublic, context.getHandler());
      const userRoles =
        this.reflector.get(RolesDec, context.getHandler()) ?? [];
      const adminRoles =
        this.reflector.get(AdminRolesDec, context.getHandler()) ?? [];

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

      const jwtUser =
        await this.jwtService.verifyAsync<UserDocument>(accessToken);

      const user = await this.authService.validateJwtPayload(
        accessToken,
        jwtUser._id,
      );

      if (!user) {
        throw new ForbiddenException('Access token is invalid', {
          cause: 'InvalidAccessToken',
        });
      }

      if (userRoles && userRoles.length > 0) {
        if (!userRoles.includes(user.role)) {
          throw new UnauthorizedException('Not permitted');
        }
      }

      if (adminRoles && adminRoles.length > 0) {
        if (adminRoles && !userRoles.includes(Roles.Admin)) {
          throw new InternalServerErrorException(
            'Setup user roles decorator with admin to use admin roles decorator',
          );
        }

        if (!adminRoles.includes(user?.admin?.permission)) {
          throw new UnauthorizedException(
            `Only ${adminRoles.join(', ')} are permitted`,
          );
        }
      }

      req.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
