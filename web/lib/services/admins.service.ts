import { https } from '../configs/http.config';
import { GetAdminsQuery } from '../schemas/interfaces';
import { Admin, ApiResponse } from '../schemas/types';
import { errorHandler } from '../utils';

const getAllAdmins = async (query: GetAdminsQuery) => {
  let url = '/admin?';

  if (query?.search) {
    url += `search=${query.search}&`;
  }

  if (query?.permission) {
    url += `permission=${query.permission}&`;
  }

  if (query?.department) {
    url += `department_id=${query?.department?._id}&`;
  }

  try {
    const response = await https.get<ApiResponse<Admin[]>>(url);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const adminService = {
  getAllAdmins,
};

export default adminService;
