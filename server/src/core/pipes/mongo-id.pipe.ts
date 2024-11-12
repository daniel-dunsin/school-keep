import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class MongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid mongo id');
    }

    return value;
  }
}
