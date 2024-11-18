import { ReactNode } from 'react';

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
