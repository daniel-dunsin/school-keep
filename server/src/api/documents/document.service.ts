import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from './schemas/document.schema';
import { Model } from 'mongoose';
import { Folder } from './schemas/folders.schema';
import { Department } from '../school/schemas/department.schema';
import { Student } from '../student/schemas/student.schema';
import { isEmpty } from 'lodash';

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
      isCustom: true,
    });

    await new this.folderModel(data).save();
  }
}
