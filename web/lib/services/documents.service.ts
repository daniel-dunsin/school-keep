import { https } from '../configs/http.config';
import { GetAllDocumentsQuery } from '../schemas/interfaces';
import { ApiResponse, Document, Folder } from '../schemas/types';
import { errorHandler } from '../utils';

const getAllDocuments = async (query: GetAllDocumentsQuery) => {
  let url = '/document?';

  if (query.folder_id) {
    url = `/document/folder/${query.folder_id}/documents?`;
  }

  if (query.search) {
    url += `search=${query.search}`;
  }

  try {
    const response = await https.get<ApiResponse<Document[]>>(url);

    return response?.data?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const getStudentFolders = async (studentId: string) => {
  try {
    const response = await https.get<ApiResponse<Folder[]>>(
      `/document/folder?studentId=${studentId}`
    );

    return response?.data?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const documentService = {
  getAllDocuments,
  getStudentFolders,
};
export default documentService;
