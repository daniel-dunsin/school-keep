import { UserDocument } from 'src/api/user/schemas/user.schema';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
