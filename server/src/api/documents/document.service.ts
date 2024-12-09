import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from './schemas/document.schema';
import { Model, Types } from 'mongoose';
import { Folder } from './schemas/folders.schema';
import { Department } from '../school/schemas/department.schema';
import { Student } from '../student/schemas/student.schema';
import { isEmpty } from 'lodash';
import { CreateFolderDto } from './dtos';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<Document>,
    @InjectModel(Folder.name)
    private readonly folderModel: Model<Folder>,
    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}

  async initStudentFolders(studentId: string) {
    const student = await this.studentModel
      .findById(studentId)
      .populate('department', 'levelsCount _id');

    if (!student) throw new NotFoundException('Student not found');

    if (!isEmpty(await this.folderModel.find({ student: student._id }))) {
      return;
    }

    const data = [];

    new Array(student.department.levelsCount).fill(null).forEach((_, index) => {
      data.push({
        student: student._id,
        level: index + 1,
        folderName: `${index + 1}00L`,
        isCustom: false,
      });
    });

    data.push({
      student: student._id,
      folderName: 'Misc',
      isCustom: false,
    });

    await new this.folderModel(data).save();
  }

  async createFolder(createFolderDto: CreateFolderDto, studentId: string) {
    const data = await this.folderModel.create({
      student: new Types.ObjectId(studentId),
      folderName: createFolderDto.folderName,
      isCustom: true,
    });

    return {
      message: 'Folder created',
      data,
      success: true,
    };
  }

  async getStudentFolders(studentId: string) {
    const data = await this.folderModel
      .find({
        student: new Types.ObjectId(studentId),
      })
      .select('-student -updatedAt')
      .sort({ level: 1, createdAt: 1 });

    return {
      message: 'Folders fetched successfully',
      data,
    };
  }

  async deleteFolder(folderId: string) {
    const data = await this.folderModel.findById(folderId);

    if (!data) throw new NotFoundException('Folder not found');
    if (!data.isCustom)
      throw new BadRequestException('Only non-custom folders can be deleted');

    await data.deleteOne();

    return {
      message: 'Folder deleted successfully',
      success: true,
    };
  }

  async updateFolder(updateFolderDto: CreateFolderDto, folderId: string) {
    const folder = await this.folderModel.findById(folderId);

    if (!folder) throw new NotFoundException('Folder not found');
    if (!folder.isCustom)
      throw new BadRequestException('Only non-custom folders can be edited');

    await this.folderModel.findByIdAndUpdate(folderId, updateFolderDto);

    return {
      message: 'Folder updated successfully',
      success: true,
    };
  }
}
