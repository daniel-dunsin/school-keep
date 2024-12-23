import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_PROVIDER } from '../providers';
import * as mime from 'mime-types';
import { unlink } from 'fs/promises';

@Injectable()
export class FileService {
  constructor(
    @Inject(CLOUDINARY_PROVIDER) private readonly cloudinary: typeof v2,
  ) {}

  async uploadResource(
    file: string,
    isFilePath: boolean = false,
    options: UploadApiOptions = {},
  ): Promise<Pick<UploadApiResponse, 'url' | 'public_id'>> {
    try {
      console.log(file);
      let resource_type: UploadApiOptions['resource_type'] = 'auto';

      if (isFilePath) {
        const mimetype = mime.lookup(file);

        if (mimetype && mimetype.startsWith('image')) {
          resource_type = 'image';
        } else if (mimetype && mimetype.startsWith('video')) {
          resource_type = 'video';
        } else {
          resource_type = 'raw';
        }
      }

      const data = await this.cloudinary.uploader.upload(file, {
        folder: 'school_keep',
        resource_type,
        ...options,
      });

      if (isFilePath) {
        await unlink(file);
      }

      return { url: data.secure_url, public_id: data.public_id };
    } catch (error: any) {
      console.log(error);
      throw new BadRequestException(
        `Unable to upload resource to cloud ${error.message ?? error}`,
      );
    }
  }

  async deleteResource(
    public_id: string,
    options: UploadApiOptions = {},
  ): Promise<void> {
    try {
      await this.cloudinary.uploader.destroy(public_id, { ...options });
    } catch (error: any) {
      console.log(error);
      throw new BadRequestException(
        `Unable to delete resource from cloud ${error.message ?? error}`,
      );
    }
  }
}
