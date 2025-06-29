import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envSchema from './shared/schemas/env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: envSchema,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const DATABASE_URL = configService.get<string>('DATABASE_URL');

        return {
          uri: DATABASE_URL,
        };
      },
    }),
    ApiModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
