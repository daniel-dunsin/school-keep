import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import {
  IsBoolean,
  IsNumber,
  IsString,
} from 'src/core/decorators/validators.decorators';

export class AddClearanceDto {
  @IsString(false)
  clearance_name: string;

  @IsBoolean(false)
  payment_required: boolean;

  @IsNumber(true)
  fee?: number;

  @IsArray()
  required_documents: string[];
}

export class GetClearanceQuery {
  @IsString(true)
  search?: string;
}

export class SetDepartmentRequiredClearance {
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({
    type: [String],
    example: [new Types.ObjectId()],
  })
  required_clearance: string[];
}
