import { https } from '../configs/http.config';
import { CreateCollegesDto } from '../schemas/interfaces';
import { ApiResponse, College } from '../schemas/types';
import { errorHandler } from '../utils';

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

const schoolService = {
  createColleges,
  getColleges,
};

export default schoolService;
