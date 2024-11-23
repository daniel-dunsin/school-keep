import { ReactNode } from 'react';
import { Department } from './types';
import { AdminPermissions } from './enums';

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

export interface AddAdminDto {
  department: string;
  permission: AdminPermissions;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
