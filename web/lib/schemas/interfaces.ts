import { ReactNode } from 'react';
import { College, Department } from './types';
import {
  AdminPermissions,
  AnnouncementDestination,
  AnnouncementStatus,
} from './enums';

export interface LoginDto {
  email: string;
  password: string;
  remember_me: boolean;
  is_mobile?: false;
}

export interface ConfirmPasswordOtpDto {
  email: string;
  code: string;
}

export interface ResetPasswordDto {
  tempToken: string;
  password: string;
}

export interface SidebarLink {
  route: string;
  icon: ReactNode;
  routeName: string;
}

export interface CreateCollegesDto {
  name: string;
  unionName: string;
  logo?: File | string;
}

export interface CreateDepartmentDto {
  name: string;
  unionName: string;
  logo?: File | string;
  levelsCount: number;
}

export interface TabsDto {
  header: string;
  widget: ReactNode;
}

export interface GetAdminsQuery {
  search?: string;
  department?: Department;
  permission?: AdminPermissions;
}

export interface GetStudentsQuery {
  search?: string;
  department?: Department;
}

export interface AddAdminDto {
  department: string;
  permission: AdminPermissions;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface CreateStudentDto {
  department: string;
  matricNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface CreateAnnouncementDto {
  title?: string;
  content?: string;
  image?: File | string;
  start_date?: Date;
  end_date?: Date;
  destination_type: AnnouncementDestination;
  departments?: string[];
  colleges?: string[];
  status?: AnnouncementStatus;
}

export interface GetAnnouncementsQuery {
  search?: string;
  destination_type?: AnnouncementDestination;
  status?: AnnouncementStatus;
}

export interface GetClearanceQuery {
  search?: string;
}

export interface GetAllDocumentsQuery {
  search?: string;
  student_id?: string;
  folder_id?: string;
}
