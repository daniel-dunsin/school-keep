import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { generate } from 'otp-generator';

@Injectable()
export class UtilsService {
  async hashPassword(password: string) {
    const hashedPassword = await argon.hash(password);

    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await argon.verify(hashedPassword, password);
  }

  generateRandomValues(length: number, isOtp: boolean) {
    return generate(
      length,
      isOtp
        ? {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          }
        : {
            digits: true,
            lowerCaseAlphabets: true,
            upperCaseAlphabets: true,
            specialChars: true,
          },
    );
  }
}
