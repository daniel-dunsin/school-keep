import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ConfirmForgotPasswordOtpDto,
  ForgotPasswordOtp,
  LoginDto,
  ResetPasswordDto,
  StudentSignUpDto,
} from './dtos';
import { Request, Response } from 'express';
import { Auth, IsPublic } from 'src/core/decorators/auth.decoractor';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(loginDto);

    if (!loginDto.is_mobile) {
      const ONE_DAY = 24 * 60 * 60 * 1000;
      res.cookie('x-school-keep-bearer', data.meta.accessToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        partitioned: true,
        maxAge: loginDto?.remember_me ? 7 * ONE_DAY : ONE_DAY,
      });

      delete data.meta;
      return res.json(data);
    }

    return res.json(data);
  }

  @Post('sign-up/student')
  @IsPublic()
  async studentSignUp(@Body() studentSignUpDto: StudentSignUpDto) {
    const data = await this.authService.signUpStudent(studentSignUpDto);

    return data;
  }

  @Post('forgot-password')
  @IsPublic()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordOtp) {
    const data = await this.authService.forgotPassword(forgotPasswordDto.email);

    return data;
  }

  @Post('/forgot-password/confirm')
  @IsPublic()
  async confirmPasswordResetOtp(
    @Body() confirmForgotPasswordOtpDto: ConfirmForgotPasswordOtpDto,
  ) {
    const data = await this.authService.confirmForgotPassowrdOtp(
      confirmForgotPasswordOtpDto,
    );

    return data;
  }

  @Post('/forgot-password/reset')
  @IsPublic()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const data = await this.authService.resetPassword(resetPasswordDto);

    return data;
  }

  @Post('log-out/web')
  @IsPublic()
  async webLogOut(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.cookies['x-school-keep-bearer'];

    const data = await this.authService.webLogOut(accessToken);

    res.cookie('x-school-keep-bearer', '', {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      partitioned: true,
      maxAge: 0,
    });

    return res.json(data);
  }

  @Post('log-out')
  async logOut(@Auth('_id') userId: string) {
    return await this.authService.logOut(userId);
  }
}
