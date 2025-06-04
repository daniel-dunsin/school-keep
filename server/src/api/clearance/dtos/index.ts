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

export class RejectClearanceDto {
  @IsString(true)
  rejectionReason: string;

  studentId: string;
  clearanceId: string;
  userId: string;
}

export class ApproveStudentClearanceDto {
  @IsString(true)
  approvalSignature: string;

  @IsBoolean(true)
  setDefaultSignature: boolean;

  studentId: string;
  clearanceId: string;
  userId: string;
}

export class RequestStudentClearanceDto {
  @IsString(true)
  schoolClearanceId: string;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({
    type: [String],
    example: [new Types.ObjectId()],
  })
  documents: string[];
}
