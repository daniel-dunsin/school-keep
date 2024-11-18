import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/api/user/schemas/user.schema';

export const IsPublic = Reflector.createDecorator<'IS_PUBLIC'>();

export const Auth = createParamDecorator(
  (data: keyof User, executionContext: ExecutionContext) => {
    const ctx = executionContext.switchToHttp();

    const req = ctx.getRequest<Request>();

    return data ? req.user?.[data] : req.user;
  },
);
