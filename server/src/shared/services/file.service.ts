import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_PROVIDER } from '../providers';

@Injectable()
export class FileService {
  constructor(
    @Inject(CLOUDINARY_PROVIDER) private readonly cloudinary: typeof v2,
  ) {}

  async uploadResource(
    file: string,
    options: UploadApiOptions = {},
  ): Promise<Pick<UploadApiResponse, 'url' | 'public_id'>> {
    try {
      const data = await this.cloudinary.uploader.upload(file, {
        ...options,
        folder: 'school_keep',
      });

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
