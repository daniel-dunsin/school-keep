import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'src/core/decorators/validators.decorators';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DepartmentDto {
  @IsString(false)
  name: string;

  @IsString(false)
  unionName: string;

  @IsString(false)
  logo: string;

  @IsNumber(false)
  levelsCount: number;
}

export class CreateDepartmentDto {
  @ApiProperty({
    type: [DepartmentDto],
  })
  @ValidateNested({ each: true })
  @Type(() => DepartmentDto)
  departments: DepartmentDto[];

  schoolId: string;
  collegeId: string;
}

export class GetCollegesQuery {
  @IsString(true)
  search?: string;
}
