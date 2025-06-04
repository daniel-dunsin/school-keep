import { https } from '../configs/http.config';
import {
  CreateDocumentDto,
  GetAllDocumentsQuery,
  UpdateDocumentDto,
} from '../schemas/interfaces';
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

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const createDocument = async (body: CreateDocumentDto) => {
  const formData = new FormData();

  formData.append('file', body.file!);
  formData.append('documentName', body.documentName);
  formData.append('folder', body.folder);
  formData.append('studentId', body.studentId);

  try {
    const response = await https.post(`/document`, formData, {
      signal: body.abortController?.signal,
      onUploadProgress(progress) {
        if (body.onUploadProgress) {
          const fileSize = progress.total || 1;
          const uploadedFileSize = progress.loaded;
          const uploadPercentage = (uploadedFileSize / fileSize) * 100;

          body.onUploadProgress(Number(uploadPercentage.toFixed(2)));
        }
      },
    });

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const getStudentDocuments = async (studentId: string) => {
  try {
    const response = await https.get<ApiResponse<Document[]>>(
      `/document/student/${studentId}`
    );

    return response?.data?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const documentService = {
  getAllDocuments,
  getStudentFolders,
  getDocument,
  updateDocument,
  createDocument,
  getStudentDocuments,
};
export default documentService;
