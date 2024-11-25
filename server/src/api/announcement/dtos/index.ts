import {
  IsDate,
  IsEnum,
  IsString,
} from 'src/core/decorators/validators.decorators';
import { AnnouncementDestination, AnnouncementStatus } from '../enums';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString(true)
  image?: string;

  @IsDate(true)
  start_date?: Date;

  @IsDate(true)
  end_date?: Date;

  @IsEnum(AnnouncementDestination, false)
  destination_type: AnnouncementDestination;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  departments: string[];

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  colleges: string[];

  @IsString(false)
  title: string;

  @IsString(false)
  description: string;

  image_public_id?: string;
  school?: string;
}

export class GetAnnouncementsQuery {
  @IsEnum(AnnouncementDestination, true)
  destination_type?: AnnouncementDestination;

  @IsEnum(AnnouncementStatus, true)
  status?: AnnouncementStatus;

  @IsString(true)
  search?: string;

  student_id?: string;
}
