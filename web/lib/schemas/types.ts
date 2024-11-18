export type ApiResponse<data = any, meta = undefined> = {
  success: boolean;
  data: data;
  meta: meta;
  message: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: any;
  school: School;
  student?: Student;
  admin?: Admin;
  createdAt: string;
};

export type School = {};

export type Student = {};

export type Admin = {};

export type AuthPages =
  | 'login'
  | 'forgot-password'
  | 'confirm-password-otp'
  | 'reset-password';

export type AuthSession = 'loading' | 'authenticated' | 'unauthenticated';
