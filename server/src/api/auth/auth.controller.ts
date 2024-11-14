import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
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
        partitioned: false,
      });

      delete data.meta;
      return res.json(data);
    }

    return res.json(data);
  }
}
