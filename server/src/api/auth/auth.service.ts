import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { LoginDto } from './dtos';
import { UtilsService } from 'src/shared/services/util.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly utilService: UtilsService,
    private readonly jwtService: JwtService,
  ) {}

  async signJwtToken(user: UserDocument, remember_me: boolean = false) {
    const ONE_DAY = 24 * 60 * 60 * 1000;

    const token = await this.jwtService.signAsync(user, {
      expiresIn: remember_me ? 7 * ONE_DAY : ONE_DAY,
    });

    return token;
  }

  async login(loginDto: LoginDto) {
    loginDto.email = loginDto.email.toLowerCase();

    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .populate('admin student school');

    if (!user) {
      throw new NotFoundException('Invalid login credentials');
    }

    const auth = await this.authModel.findOne({ user: user._id });

    if (!auth)
      throw new NotFoundException(
        "Authentication credentials not found! We're fixing it...",
      );

    if (
      !(await this.utilService.comparePassword(
        loginDto.password,
        auth.password,
      ))
    ) {
      throw new BadRequestException('Invalid login credentials');
    }

    const accessToken = await this.signJwtToken(
      user.toObject(),
      loginDto.remember_me,
    );

    auth.accessToken = accessToken;
    await auth.save();

    return {
      success: true,
      message: 'login successful',
      data: user,
      meta: {
        accessToken,
      },
    };
  }
}
