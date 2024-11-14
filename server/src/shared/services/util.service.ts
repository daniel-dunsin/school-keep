import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class UtilsService {
  async hashPassword(password: string) {
    const hashedPassword = await argon.hash(password);

    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await argon.verify(hashedPassword, password);
  }
}
