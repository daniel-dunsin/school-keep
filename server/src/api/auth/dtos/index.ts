import {
  IsBoolean,
  IsEmail,
  IsMongoId,
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

export class StudentSignUpDto {
  @IsString(false)
  firstName: string;

  @IsString(false)
  lastName: string;

  @IsEmail(false)
  email: string;

  @IsString(false)
  phoneNumber: string;

  @IsString(true)
  profilePicture: string;

  @IsMongoId(true)
  school: string;

  @IsString(false)
  matricNumber: string;

  @IsMongoId(true)
  department: string;

  @IsString(true)
  password: string;
}
