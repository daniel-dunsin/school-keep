import { https } from '../configs/http.config';
import { CreateCollegesDto, CreateDepartmentDto } from '../schemas/interfaces';
import { ApiResponse, College, Department } from '../schemas/types';
import { convertImageToBase64, errorHandler } from '../utils';

const createColleges = async (colleges: CreateCollegesDto[]) => {
  try {
    const response = await https.post('/school/college', { colleges });

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getColleges = async (search?: string) => {
  let url = `/school/college?`;

  if (search) {
    url += `search=${search}&`;
  }

  try {
    const response = await https.get<
      ApiResponse<
        College[],
        { totalColleges: number; totalDepartments: number }
      >
    >(url);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getCollege = async (collegeId: string) => {
  try {
    const response = await https.get<ApiResponse<College>>(
      `/school/college/${collegeId}`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getDepartments = async (collegeId: string) => {
  try {
    const response = await https.get<ApiResponse<Department[]>>(
      `/school/college/${collegeId}/department`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const updateCollege = async (
  updateCollegeDto: CreateCollegesDto,
  collegeId: string
) => {
  const update = { ...updateCollegeDto };

  try {
    if (update.logo) {
      update.logo = await convertImageToBase64(update.logo as File);
    }

    const response = await https.put<ApiResponse>(
      `/school/college/${collegeId}`,
      update
    );

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const createDepartment = async (
  createDepartmentDto: CreateDepartmentDto,
  collegeId: string
) => {
  const data = { ...createDepartmentDto };

  try {
    data.logo = await convertImageToBase64(data.logo as File);

    const response = await https.post<ApiResponse>(
      `/school/college/${collegeId}/department`,
      data
    );

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const schoolService = {
  createColleges,
  getColleges,
  getCollege,
  getDepartments,
  updateCollege,
  createDepartment,
};

export default schoolService;
