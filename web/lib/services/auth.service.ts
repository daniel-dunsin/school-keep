import { https } from '../configs/http.config';
import {
  ConfirmPasswordOtpDto,
  LoginDto,
  ResetPasswordDto,
} from '../schemas/interfaces';
import { ApiResponse, User } from '../schemas/types';
import { errorHandler } from '../utils';

const login = async (loginDto: LoginDto) => {
  loginDto.is_mobile = false;
  try {
    const response = await https.post<ApiResponse<User>>(
      '/auth/login',
      loginDto
    );

    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

const forgotPassword = async (email: string) => {
  try {
    const response = await https.post<ApiResponse>('/auth/forgot-password', {
      email,
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const confirmForgotPasswordOtp = async (
  confirmPasswordOtpDto: ConfirmPasswordOtpDto
) => {
  try {
    const response = await https.post<ApiResponse<{ tempToken: string }>>(
      '/auth/forgot-password/confirm',
      confirmPasswordOtpDto
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const resetPassword = async (resetPasswordDto: ResetPasswordDto) => {
  try {
    const response = await https.post<ApiResponse>(
      '/auth/forgot-password/reset',
      resetPasswordDto
    );

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const logOut = async () => {
  try {
    const response = await https.post<ApiResponse>('/auth/log-out/web');

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const authService = {
  login,
  forgotPassword,
  confirmForgotPasswordOtp,
  resetPassword,
  logOut,
};
