import {
  AdminPermissions,
  AnnouncementDestination,
  AnnouncementStatus,
  ClearanceStatus,
  RequestClearanceStatus,
  SchoolClearanceStatus,
  StudentClearanceStatus,
  StudentStatus,
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
  phoneNumber: string;
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
  status: StudentStatus;
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
  required_clearance: SchoolClearance[];
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

export type Document = {
  version: number;
  documentName: string;
  reference: string;
  mediaType?: string;
  url?: string;
  student?: Student;
  uploadedBy?: User;
  folder?: Folder;
  _id: string;
  createdAt: Date;
};

export type Folder = {
  level: number;
  folderName: string;
  _id: string;
  createdAt: number;
};

export type Clearance = {
  _id: string;
  student: Student;
  status: ClearanceStatus;
  approvalDate: Date;
  rejectionReason: string;
  rejectionDate: Date;
  lastRequestedDate: Date;
  completionDate: Date;
};

export type ClearanceActivity = {
  _id: string;
  createdAt: Date;
  content: string;
  actor: User;
  clearance: Clearance;
};

export type SchoolClearance = {
  clearance_name: string;
  payment_required: boolean;
  fee: number;
  status: SchoolClearanceStatus;
  required_documents: string[];
  _id: string;
  is_default: boolean;
  createdAt: Date;
};

export type StudentClearance = {
  _id: string;
  student: Student;
  clearance: SchoolClearance;
  status: StudentClearanceStatus;
  approvalDate: Date;
  approvalSignature: string;
  rejectionReason: string;
  rejectionDate: Date;
  lastRequestDate: Date;
  documents: Document[];
};

export type RequestClearance = {
  message: string;
  status: RequestClearanceStatus;
  clearanceId: string;
  activities: ClearanceActivity[];
  rejectionReason: string;
  approvalDate: Date;
  completionDate: Date;
  lastRequestedDate: Date;
  rejectionDate: Date;
  clearanceDetails: {
    all: SchoolClearance[];
    requiredIds: string[];
    submitted: StudentClearance[];
  };
};

export type AuthPages =
  | 'login'
  | 'forgot-password'
  | 'confirm-password-otp'
  | 'reset-password';

export type AuthSession = 'loading' | 'authenticated' | 'unauthenticated';
