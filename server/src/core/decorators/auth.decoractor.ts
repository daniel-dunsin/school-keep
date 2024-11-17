import { createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserDocument } from 'src/api/user/schemas/user.schema';

export const IsPublic = Reflector.createDecorator<'IS_PUBLIC'>();

export const Auth = createParamDecorator(
  (data: keyof UserDocument, req: Request) => {
    return data ? req.user[data] : req.user;
  },
);
