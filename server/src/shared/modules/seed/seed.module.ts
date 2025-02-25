import { forwardRef, Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AdminModule } from 'src/api/admin/admin.module';
import { UserModule } from 'src/api/user/user.module';
import { SchoolModule } from 'src/api/school/school.module';
import { UtilsService } from 'src/shared/services/util.service';
import { AuthModule } from 'src/api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClearanceModule } from 'src/api/clearance/clearance.module';

@Module({
  imports: [
    AdminModule,
    forwardRef(() => UserModule),
    SchoolModule,
    forwardRef(() => AuthModule),
    ConfigModule,
    ClearanceModule,
  ],
  providers: [SeedService, UtilsService],
})
export class SeedModule {}
