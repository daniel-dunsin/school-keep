import {
  IsEmail,
  IsMongoId,
  IsString,
} from 'src/core/decorators/validators.decorators';

export class CreateStudentDto {
  @IsString(false)
  firstName: string;

  @IsString(false)
  lastName: string;

  @IsEmail(false)
  email: string;

  @IsString(false)
  phoneNumber: string;

  @IsString(false)
  matricNumber: string;

  @IsMongoId(true)
  department: string;
}

export class GetStudentsDto {
  @IsString(true)
  search?: string;

  @IsMongoId(true)
  college_id?: string;

  @IsMongoId(true)
  department_id?: string;
}
