import { https } from '../configs/http.config';
import { LoginDto } from '../schemas/interfaces';
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
    console.log(error);
    throw errorHandler(error);
  }
};

export const authService = {
  login,
};
