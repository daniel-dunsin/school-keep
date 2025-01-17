import { https } from '../configs/http.config';
import { ApiResponse, Document } from '../schemas/types';
import { errorHandler } from '../utils';

const getAllDocuments = async (search?: string) => {
  let url = '/document?';
  if (search) {
    url += `search=${search}`;
  }

  try {
    const response = await https.get<ApiResponse<Document[]>>(url);

    return response?.data?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const documentService = {
  getAllDocuments,
};
export default documentService;
