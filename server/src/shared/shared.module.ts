import { Module } from '@nestjs/common';
import { SeedModule } from './modules/seed/seed.module';
import { UtilsService } from './services/util.service';
import { FileService } from './services/file.service';
import { CloudinaryProvider } from './providers';

@Module({
  imports: [SeedModule],
  providers: [UtilsService, FileService, CloudinaryProvider],
  exports: [SeedModule, UtilsService, FileService],
})
export class SharedModule {}
