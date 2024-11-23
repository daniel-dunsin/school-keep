import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsString,
} from 'src/core/decorators/validators.decorators';
import { AdminRoles } from '../enums';

export class GetAdminsDto {
  @IsString(true)
  search?: string;

  @IsMongoId(true)
  college_id?: string;

  @IsMongoId(true)
  department_id?: string;

  @IsEnum(AdminRoles, true)
  permission?: AdminRoles;
}

export class CreateAdminDto {
  @IsMongoId(true)
  department?: string;

  @IsEnum(AdminRoles, false)
  permission: AdminRoles;

  @IsString(false)
  firstName: string;

  @IsString(false)
  lastName: string;

  @IsEmail(false)
  email: string;

  @IsString(false)
  phoneNumber: false;
}
