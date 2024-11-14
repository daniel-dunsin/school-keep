import {
  IsBoolean,
  IsEmail,
  IsString,
} from 'src/core/decorators/validators.decorators';

export class LoginDto {
  @IsEmail(false)
  email: string;

  @IsString(false)
  password: string;

  @IsBoolean(false)
  remember_me: boolean;

  @IsBoolean(false)
  is_mobile: boolean;
}
