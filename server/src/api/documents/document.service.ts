import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from './schemas/document.schema';
import { FilterQuery, Model, PopulateOptions, Types } from 'mongoose';
import { Folder } from './schemas/folders.schema';
import { Department } from '../school/schemas/department.schema';
import { Student } from '../student/schemas/student.schema';
import { isEmpty } from 'lodash';
import { CreateDocumentDto, CreateFolderDto, UpdateDocumentDto } from './dtos';
import { FileService } from 'src/shared/services/file.service';
import { v4 } from 'uuid';
import * as mime from 'mime-types';

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

    private readonly fileService: FileService,
  ) {}

  private async getDocReference() {
    const reference = v4();

    if (await this.documentModel.findOne({ reference })) {
      return this.getDocReference();
    }

    return reference;
  }

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

    await this.folderModel.create(data);
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
      .sort({ level: 1, createdAt: -1 });

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

    const uniquePublicIds: string[] = [];
    const ids: string[] = [];

    await this.documentModel
      .find({
        folder: data._id,
      })
      .then((docs) => {
        docs.forEach((doc) => {
          ids.push(doc._id);
          if (doc.publicId && !uniquePublicIds.includes(doc.publicId)) {
            uniquePublicIds.push(doc.publicId);
          }
        });
      });

    await this.documentModel.deleteMany({
      _id: {
        $in: ids,
      },
    });

    await Promise.all(
      uniquePublicIds.map(async (publicId) =>
        this.fileService.deleteResource(publicId),
      ),
    );

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

  async createDocument(
    documentDto: CreateDocumentDto,
    userId: string,
    studentId?: string,
  ) {
    const folder = await this.folderModel.findById(documentDto.folder);
    if (!folder) throw new NotFoundException('Oops! folder not found');

    console.log(documentDto.file);

    const { url, public_id } = await this.fileService.uploadResource(
      documentDto.file.path,
      true,
    );

    const reference = await this.getDocReference();

    const data = await this.documentModel.create({
      documentName: documentDto.documentName,
      folder: folder._id,
      url,
      publicId: public_id,
      version: 1,
      reference,
      uploadedBy: new Types.ObjectId(userId),
      student: new Types.ObjectId(studentId ?? documentDto.studentId),
      mediaType:
        mime.lookup(documentDto.file.path) || documentDto.file.mimetype,
    });

    return {
      message: 'Document created',
      success: true,
      data,
    };
  }

  async getDocuments(query?: any) {
    const _query: FilterQuery<Document> = {};

    if (query.folder_id) {
      _query['folder'] = new Types.ObjectId(query.folder_id);
    }

    if (query.reference) {
      _query['reference'] = query.reference;
    }

    const data = await this.documentModel.aggregate([
      {
        $match: _query,
      },
      {
        $sort: {
          reference: 1,
          version: -1,
        },
      },
      {
        $group: {
          _id: '$reference',
          docFields: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$docFields' },
      },
      {
        $lookup: {
          from: 'users',
          as: 'uploadedBy',
          localField: 'uploadedBy',
          foreignField: '_id',
          pipeline: [
            {
              $lookup: {
                from: 'admins',
                as: 'admin',
                localField: '_id',
                foreignField: 'user',
                pipeline: [
                  {
                    $lookup: {
                      from: 'departments',
                      as: 'department',
                      localField: 'department',
                      foreignField: '_id',
                    },
                  },
                  {
                    $unwind: {
                      path: '$department',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: '$admin',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                profilePicture: 1,
                admin: {
                  _id: 1,
                  permission: 1,
                  department: {
                    name: 1,
                    unionName: 1,
                    logo: 1,
                    _id: 1,
                  },
                },
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$uploadedBy',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          updatedAt: 0,
          publicId: 0,
          student: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return {
      message: 'Documents fetched successfully',
      success: true,
      data,
    };
  }

  async updateDocument(
    updateDocumentDto: UpdateDocumentDto,
    reference: string,
    userId: string,
  ) {
    const { file, documentName } = updateDocumentDto;

    const versions = await this.documentModel
      .find({ reference })
      .sort({ version: -1 })
      .limit(1);

    const latestVersion = versions[0];

    if (!latestVersion) throw new NotFoundException('Document not found');

    const requestData = {
      ...latestVersion.toObject(),
      version: latestVersion.version + 1,
      uploadedBy: new Types.ObjectId(userId),
      id: undefined,
      _id: undefined,
      __v: undefined,
    };

    if (file) {
      const { url, public_id } = await this.fileService.uploadResource(
        file.path,
        true,
      );

      requestData.url = url;
      requestData.publicId = public_id;
    }

    if (documentName) {
      requestData.documentName = documentName;
    }

    const data = await this.documentModel.create(requestData);

    return {
      message: 'Document updated (new version created)',
      success: true,
      data,
    };
  }

  async getDocument(document_id: string) {
    const populateOptions: PopulateOptions[] = [
      {
        path: 'uploadedBy',
        select: 'admin firstName lastName profilePicture',
        populate: {
          path: 'admin',
          select: 'department permission',
          populate: {
            path: 'department',
            select: 'logo unionName name',
          },
        },
      },
    ];

    const selectOptions = '-updatedAt -publicId -student';

    const data = await this.documentModel
      .findById(document_id)
      .populate(populateOptions)
      .select(selectOptions);

    if (!data) throw new NotFoundException('Document not found');

    const otherVersions = await this.documentModel
      .find({
        reference: data.reference,
        _id: { $ne: data._id },
      })
      .populate(populateOptions)
      .select(selectOptions)
      .sort({ version: -1 });

    return {
      message: 'Document fetched',
      data,
      meta: {
        otherVersions,
      },
    };
  }

  async deleteDocument(document_id: string) {
    const document = await this.documentModel.findById(document_id);

    if (!document) throw new NotFoundException('Document not found');

    const uniquePublicIds: string[] = [];
    const ids: string[] = [];

    await this.documentModel
      .find({
        reference: document.reference,
      })
      .then((docs) => {
        docs.forEach((doc) => {
          ids.push(doc._id);
          if (doc.publicId && !uniquePublicIds.includes(doc.publicId)) {
            uniquePublicIds.push(doc.publicId);
          }
        });
      });

    await this.documentModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
    await Promise.all(
      uniquePublicIds.map(async (publicId) =>
        this.fileService.deleteResource(publicId),
      ),
    );

    return {
      message: 'All versions of this document has been deleted',
      success: true,
    };
  }

  async moveDocumentFolder(document_id: string, folder_id: string) {
    const document = await this.documentModel.findById(document_id);
    if (!document) throw new NotFoundException('Document not found');

    const folder = await this.folderModel.findById(folder_id);
    if (!folder) throw new NotFoundException('Folder not found');

    await this.documentModel.updateMany(
      { reference: document.reference },
      {
        $set: {
          folder: folder._id,
        },
      },
    );

    return {
      message: 'Document moved',
      success: true,
    };
  }
}
