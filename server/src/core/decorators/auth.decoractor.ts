import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AdminRoles } from 'src/api/admin/enums';
import { Roles } from 'src/api/user/enums';
import { User } from 'src/api/user/schemas/user.schema';

export const IsPublic = Reflector.createDecorator<'IS_PUBLIC'>();

export const RolesDec = Reflector.createDecorator<Roles[]>();
export const AdminRolesDec = Reflector.createDecorator<AdminRoles[]>();

export const Auth = createParamDecorator(
  (data: keyof User, executionContext: ExecutionContext) => {
    const ctx = executionContext.switchToHttp();

    const req = ctx.getRequest<Request>();

    return data ? req.user?.[data] : req.user;
  },
);
