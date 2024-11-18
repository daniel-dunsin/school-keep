import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(userId: string) {
    const user = await this.userModel.findById(userId).populate([
      {
        path: 'admin',
        populate: {
          path: 'department',
          populate: 'college',
        },
      },
      { path: 'school', populate: 'manager' },
      {
        path: 'student',
        populate: {
          path: 'department',
          populate: 'college',
        },
      },
    ]);

    if (!user) throw new NotFoundException('User not found');

    return {
      message: 'user profile fetched successfully',
      success: true,
      data: user,
    };
  }
}
