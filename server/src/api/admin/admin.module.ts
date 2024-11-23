import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    UserModule,
    SchoolModule,
    forwardRef(() => AuthModule),
    forwardRef(() => SharedModule),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [MongooseModule],
})
export class AdminModule {}
