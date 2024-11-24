import { https } from '../configs/http.config';
import { AddAdminDto, GetAdminsQuery } from '../schemas/interfaces';
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

const createAdmin = async (addAdminDto: AddAdminDto) => {
  try {
    const response = await https.post('/admin', addAdminDto);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const deleteAdmin = async (adminId: string) => {
  try {
    const response = await https.delete(`/admin/${adminId}`);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const adminService = {
  getAllAdmins,
  createAdmin,
  deleteAdmin,
};

export default adminService;
