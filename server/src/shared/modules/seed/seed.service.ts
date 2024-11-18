import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/api/admin/schemas/admin.schema';
import { School, SchoolDocument } from 'src/api/school/schemas/school.schema';
import { User, UserDocument } from 'src/api/user/schemas/user.schema';
import SCHOOLS from 'src/shared/modules/seed/seeds/schools.json';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/shared/services/util.service';
import { Roles } from 'src/api/user/enums';
import { Auth, AuthDocument } from 'src/api/auth/schemas/auth.schema';
import { AdminRoles } from 'src/api/admin/enums';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    private readonly configService: ConfigService,
    private readonly utilService: UtilsService,
  ) {}

  async runSeeds() {
    await this.seedSchools();
    await this.seedAdmins().catch((e) => console.log(e));
    this.logger.log('Seed Complete 💃🏻');
  }

  private async seedSchools() {
    const count = await this.schoolModel.countDocuments();
    const schools = SCHOOLS;
    const createSchoolPromises = [];

    if (!count) {
      schools.map((school) => {
        const updateData = {
          name: school.name,
          acronym: school.acronym,
          motto: school.motto,
          logo: school.logo,
          webUrl: school.web,
        };

        createSchoolPromises.push(
          this.schoolModel.findOneAndUpdate(
            {
              name: school.name,
              acronym: school.acronym,
            },
            updateData,
            {
              upsert: true,
              new: true,
            },
          ),
        );
      });

      await Promise.all(createSchoolPromises);
    }
  }

  private async seedAdmins() {
    const count = await this.adminModel.countDocuments();
    const schools = await this.schoolModel
      .find({})
      .select('manager webUrl acronym name');

    if (!count) {
      const managersPassword = this.configService.get<string>(
        'SCHOOL_MANAGERS_PASSWORD',
      );

      const hashedPassword =
        await this.utilService.hashPassword(managersPassword);

      await Promise.all(
        schools.map(async (school) => {
          if (!school.manager) {
            let domainName = new URL(school.webUrl).hostname;

            domainName = domainName.startsWith('www.')
              ? domainName.slice(4)
              : domainName;

            return this.userModel
              .create({
                email: 'admin@' + domainName,
                firstName: school.acronym ?? school.name,
                lastName: 'admin',
                role: Roles.Admin,
                school: school._id,
              })
              .then(async (user) => {
                school.manager = user._id;

                const admin = await this.adminModel.create({
                  user: user._id,
                  permission: AdminRoles.SuperAdmin,
                });

                user.admin = admin._id;

                await Promise.all([
                  this.authModel.create({
                    user: user._id,
                    password: hashedPassword,
                  }),
                  user.save(),
                  school.save(),
                ]);
              });
          }
        }),
      );
    }
  }
}
