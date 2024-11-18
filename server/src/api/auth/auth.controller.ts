import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ConfirmForgotPasswordOtpDto,
  ForgotPasswordOtp,
  LoginDto,
  ResetPasswordDto,
  StudentSignUpDto,
} from './dtos';
import { Response } from 'express';
import { IsPublic } from 'src/core/decorators/auth.decoractor';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(loginDto);

    if (!loginDto.is_mobile) {
      res.cookie('x-school-keep-bearer', data.meta.accessToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        partitioned: true,
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
}
