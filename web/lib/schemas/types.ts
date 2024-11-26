import {
  AdminPermissions,
  AnnouncementDestination,
  AnnouncementStatus,
} from './enums';

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

export type School = {
  _id: string;
  name: string;
  logo: string;
  webUrl: string;
  motto: string;
  acronym: string;
  manager?: User;
};

export type Student = {
  _id: string;
  department?: Department;
  matricNumber: string;
  user?: User;
};

export type Admin = {
  _id: string;
  department?: Department;
  permission: AdminPermissions;
  user?: User;
};

export type Department = {
  _id: string;
  name: string;
  unionName: string;
  logo: string;
  college: College;
  levelsCount: number;
  totalStudents?: number;
  totalAdmins?: number;
  students?: Student[];
  admins?: Admin[];
};

export type College = {
  _id: string;
  name: string;
  unionName: string;
  logo: string;
};

export type Announcement = {
  title: string;
  content: string;
  colleges: College[];
  departments: Department[];
  destination_type: AnnouncementDestination;
  image: string;
  _id: string;
  start_date?: Date;
  end_date?: Date;
  status: AnnouncementStatus;
};

export type AuthPages =
  | 'login'
  | 'forgot-password'
  | 'confirm-password-otp'
  | 'reset-password';

export type AuthSession = 'loading' | 'authenticated' | 'unauthenticated';
