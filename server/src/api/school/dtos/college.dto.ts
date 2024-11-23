import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'src/core/decorators/validators.decorators';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CollegeDto {
  @IsString(false)
  name: string;

  @IsString(false)
  unionName: string;

  @IsString(false)
  logo: string;
}

export class CreateCollegeDto {
  @ApiProperty({
    type: [CollegeDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CollegeDto)
  colleges: CollegeDto[];

  schoolId: string;
}

export class UpdateCollegeDto {
  @IsString(true)
  name: string;

  @IsString(true)
  unionName: string;

  @IsString(true)
  logo: string;

  logoPublicId: string;
}

export class GetCollegesQuery {
  @IsString(true)
  school_id?: string;

  @IsString(true)
  search?: string;
}
