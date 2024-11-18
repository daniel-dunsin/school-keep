import { https } from '../configs/http.config';
import { ApiResponse, User } from '../schemas/types';
import { errorHandler } from '../utils';

const getUser = async () => {
  try {
    const response = await https.get<ApiResponse<User>>('/user');

    return response?.data?.data;
  } catch (error) {
    return false;
  }
};

const userService = {
  getUser,
};

export default userService;
