import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { FileService } from 'src/shared/services/file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly fileService: FileService,
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

  async updateProfilePicture(profilePicture: string, userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) throw new NotFoundException('User account not found');

    const profilePictureId = user.profilePictureId;

    const { url, public_id } =
      await this.fileService.uploadResource(profilePicture);

    user.profilePicture = url;
    user.profilePictureId = public_id;
    await user.save();

    if (profilePictureId) {
      await this.fileService.deleteResource(profilePictureId);
    }

    return {
      message: 'User profile picture updated',
    };
  }
}
