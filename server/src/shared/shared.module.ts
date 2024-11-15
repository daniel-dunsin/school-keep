import { Module } from '@nestjs/common';
import { SeedModule } from './modules/seed/seed.module';
import { UtilsService } from './services/util.service';
import { FileService } from './services/file.service';
import { CloudinaryProvider } from './providers';
import { EmailModule } from './modules/mail/mail.module';

@Module({
  imports: [SeedModule, EmailModule],
  providers: [UtilsService, FileService, CloudinaryProvider],
  exports: [SeedModule, UtilsService, FileService, EmailModule],
})
export class SharedModule {}
