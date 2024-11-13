import { applyDecorators } from '@nestjs/common';
import { Schema } from '@nestjs/mongoose';

export class TimestampMixin {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export const DBSchema = () => {
  return applyDecorators(
    Schema({
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      virtuals: true,
      versionKey: false,
    }),
  );
};
