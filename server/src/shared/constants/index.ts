import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const DEFAULT_IMAGES = {
  profilePicture:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU',
};

export const MULTER_DISK_STORAGE = diskStorage({
  destination: join(__dirname, '../uploads'),
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});
