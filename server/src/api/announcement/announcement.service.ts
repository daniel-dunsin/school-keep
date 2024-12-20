import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement } from './schemas/announcement.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  CreateAnnouncementDto,
  GetAnnouncementsQuery,
  UpdateAnnouncementDto,
} from './dtos';
import { AnnouncementDestination, AnnouncementStatus } from './enums';
import { isBefore } from 'date-fns';
import { FileService } from 'src/shared/services/file.service';
import { Student } from '../student/schemas/student.schema';
import { AdminDocument } from '../admin/schemas/admin.schema';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly announcmentModel: Model<Announcement>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
    private readonly fileService: FileService,
  ) {}

  private async validateAnnouncementCreation(
    createAnnouncmentDto: CreateAnnouncementDto,
  ) {
    const {
      destination_type,
      departments,
      colleges,
      start_date = new Date(),
      end_date,
    } = createAnnouncmentDto;

    switch (destination_type) {
      case AnnouncementDestination.Colleges: {
        if (!colleges || colleges.length === 0) {
          throw new BadRequestException('Select one or more colleges');
        }
        break;
      }
      case AnnouncementDestination.Departments: {
        if (!departments || departments.length === 0) {
          throw new BadRequestException('Select one or more departments');
        }
        break;
      }
      case AnnouncementDestination.General:
        break;
    }

    if (end_date) {
      if (isBefore(end_date, start_date)) {
        throw new BadRequestException(
          'Oops! end date must be after start date',
        );
      }
    }
  }

  private async refineAnnouncementUpdate(data: UpdateAnnouncementDto) {
    if (data.destination_type) {
      switch (data.destination_type) {
        case AnnouncementDestination.Colleges:
          data.departments = [];
          break;
        case AnnouncementDestination.Departments:
          data.colleges = [];
          break;
        case AnnouncementDestination.General:
          data.colleges = [];
          data.departments = [];
      }
    }

    return data;
  }

  async createAnnouncment(
    createAnnouncmentDto: CreateAnnouncementDto,
    schoolId: string,
  ) {
    await this.validateAnnouncementCreation(createAnnouncmentDto);

    if (createAnnouncmentDto.image) {
      const { url, public_id } = await this.fileService.uploadResource(
        createAnnouncmentDto.image,
      );

      createAnnouncmentDto.image = url;
      createAnnouncmentDto.image_public_id = public_id;
    }

    createAnnouncmentDto.school = schoolId;

    const data = await this.announcmentModel.create(createAnnouncmentDto);

    return {
      message: 'Announcement created',
      data,
    };
  }

  async getAnnouncments(
    query: GetAnnouncementsQuery,
    schoolId: string,
    admin?: AdminDocument,
  ) {
    const _query: FilterQuery<Announcement> = {
      school: new Types.ObjectId(schoolId),
    };

    if (query.destination_type) {
      _query.destination_type = query.destination_type;
      delete query.destination_type;
    }

    if (query.status) {
      if (query.status === AnnouncementStatus.Inactive) {
        _query['$or'] = [
          { status: AnnouncementStatus.Inactive },
          {
            status: AnnouncementStatus.Active,
            end_date: {
              $lt: new Date(),
            },
          },
        ];
      } else {
        _query.status = query.status;
      }
      delete query.status;
    }

    if (query.search) {
      _query.title = { $regex: new RegExp(query.search, 'i') };
      delete query.search;
    }

    if (admin && admin.department) {
      _query.destination_type = AnnouncementDestination.Departments;
      _query.departments = admin.department._id;
    }

    if (query.student_id) {
      const student = await this.studentModel
        .findById(query.student_id)
        .populate({
          path: 'department',
          select: '_id college',
          populate: {
            path: 'college',
            select: '_id',
          },
        });

      if (!student)
        throw new NotFoundException(
          'Oops! student with this _id does not exist',
        );

      _query.$or = [
        {
          destination_type: AnnouncementDestination.General,
        },
        {
          destination_type: AnnouncementDestination.Departments,
          departments: student.department._id,
        },
        {
          destination_type: AnnouncementDestination.Colleges,
          colleges: student.department.college._id,
        },
      ];

      _query.status = AnnouncementStatus.Active;
      _query.end_date = {
        $gte: new Date(),
      };

      delete query.student_id;
    }

    const data = await this.announcmentModel.aggregate([
      {
        $match: _query,
      },
      {
        $lookup: {
          from: 'departments',
          as: 'departments',
          localField: 'departments',
          foreignField: '_id',
        },
      },
      {
        $lookup: {
          from: 'colleges',
          as: 'colleges',
          localField: 'colleges',
          foreignField: '_id',
        },
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: {
                $or: [
                  {
                    $and: [
                      { $ne: ['$end_date', null] },
                      { $lt: ['$end_date', new Date()] },
                    ],
                  },
                  {
                    $eq: ['$status', AnnouncementStatus.Inactive],
                  },
                ],
              },
              then: AnnouncementStatus.Inactive,
              else: AnnouncementStatus.Active,
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          status: 1,
          start_date: 1,
          end_date: 1,
          destination_type: 1,
          departments: {
            _id: 1,
            name: 1,
            logo: 1,
            unionName: 1,
          },
          colleges: {
            _id: 1,
            name: 1,
            logo: 1,
            unionName: 1,
          },
        },
      },
    ]);

    return {
      message: 'Announcements fetched',
      success: true,
      data,
    };
  }

  async deleteAnnouncement(announcement_id: string) {
    const data = await this.announcmentModel.findByIdAndDelete(announcement_id);

    if (!data) throw new NotFoundException('Announcement not found');

    if (data.image_public_id) {
      await this.fileService.deleteResource(data.image_public_id);
    }

    return {
      message: 'Announcement deleted',
      success: true,
    };
  }

  async updateAnnouncement(
    announcement_id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    updateAnnouncementDto = await this.refineAnnouncementUpdate(
      updateAnnouncementDto,
    );

    const announcement = await this.announcmentModel.findById(announcement_id);

    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }

    const image_public_id = announcement.image_public_id;

    if (updateAnnouncementDto.image) {
      const { url, public_id } = await this.fileService.uploadResource(
        updateAnnouncementDto.image,
      );

      updateAnnouncementDto.image = url;
      updateAnnouncementDto.image_public_id = public_id;

      if (image_public_id) {
        await this.fileService.deleteResource(image_public_id);
      }
    }

    await this.announcmentModel.findByIdAndUpdate(
      announcement_id,
      updateAnnouncementDto,
      { runValidators: true },
    );

    return {
      message: 'Announcement updated',
      success: true,
    };
  }
}
