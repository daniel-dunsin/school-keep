import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './core/filters/global.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import ValidationExceptions from './core/exceptions/validation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.disable('x-powered-by');
  app.use(helmet());
  app.enableCors({
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        return new ValidationExceptions(errors);
      },
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const swaggerDocumentBuild = new DocumentBuilder()
    .setTitle('School Keep Backend Docs 🏫')
    .setOpenAPIVersion('3.0.0')
    .setContact(
      'daniel-dunsin',
      'https://github.com/daniel-dunsin',
      'adejaredaniel12@gmail.com',
    )
    .setVersion('1.0.0')
    .addBasicAuth()
    .addCookieAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuild,
  );
  SwaggerModule.setup('/api/v1/docs', app, swaggerDocument);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
