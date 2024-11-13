import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { JsonWebTokenError } from '@nestjs/jwt';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    let errorMessage = 'Oops! an error occured';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      errorMessage = exception?.message || errorMessage;
      statusCode = exception.getStatus();
    }

    if (exception instanceof JsonWebTokenError) {
      errorMessage = exception.message || 'Jwt Malformed' || errorMessage;
      statusCode = HttpStatus.UNAUTHORIZED;
    }

    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      {
        error: errorMessage,
        statusCode: statusCode,
        success: false,
      },
      statusCode,
    );
  }
}