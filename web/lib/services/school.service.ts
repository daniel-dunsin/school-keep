import { https } from '../configs/http.config';
import { CreateCollegesDto } from '../schemas/interfaces';
import { errorHandler } from '../utils';

const createColleges = async (colleges: CreateCollegesDto[]) => {
  try {
    const response = await https.post('/school/college', { colleges });

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const schoolService = {
  createColleges,
};

export default schoolService;
