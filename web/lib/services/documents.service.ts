import { https } from '../configs/http.config';
import { GetAllDocumentsQuery, UpdateDocumentDto } from '../schemas/interfaces';
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

const getDocument = async (documentId: string) => {
  try {
    const response = await https.get<
      ApiResponse<Document, { otherVersions: Document[] }>
    >(`/document/${documentId}`);

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const updateDocument = async (
  documentReference: string,
  body: UpdateDocumentDto
) => {
  const formData = new FormData();

  if (body.documentName) {
    formData.append('documentName', body.documentName);
  }

  if (body.file) {
    formData.append('file', body.file);
  }

  try {
    const response = await https.put(
      `/document/${documentReference}`,
      formData
    );
  } catch (error) {
    return errorHandler(error);
  }
};

const documentService = {
  getAllDocuments,
  getStudentFolders,
  getDocument,
  updateDocument,
};
export default documentService;
