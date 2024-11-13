import { Module } from '@nestjs/common';
import { SeedModule } from './modules/seed/seed.module';
import { UtilsService } from './services/util.service';

@Module({
  imports: [SeedModule],
  providers: [UtilsService],
  exports: [SeedModule, UtilsService],
})
export class SharedModule {}
