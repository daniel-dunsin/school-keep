import { IsString } from 'src/core/decorators/validators.decorators';

export class CreateFolderDto {
  @IsString(false)
  folderName: string;
}
