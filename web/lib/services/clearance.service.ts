import { https } from '../configs/http.config';
import { RequestClearanceStatus } from '../schemas/enums';
import {
  ApiResponse,
  Clearance,
  Department,
  RequestClearance,
  SchoolClearance,
} from '../schemas/types';
import { errorHandler } from '../utils';

const getSchoolClearance = async (search?: string) => {
  let url = '/clearance/school?';
  if (search) {
    url += `search=${search}`;
  }
  try {
    const response = await https.get<ApiResponse<SchoolClearance[]>>(url);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const addSchoolClearance = async (data: Omit<SchoolClearance, '_id'>) => {
  try {
    const response = await https.post('/clearance/school', data);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const deleteSchoolClearance = async (clearanceId: string) => {
  try {
    const response = await https.delete(`/clearance/school/${clearanceId}`);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getDepartmentsClearance = async (search?: string) => {
  let url = '/clearance/departments/required-clearance?';
  if (search) {
    url += `search=${search}`;
  }
  try {
    const response = await https.get<ApiResponse<Department[]>>(url);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const setDepartmentRequiredClearance = async (
  department_id: string,
  required_clearance: string[]
) => {
  try {
    const response = await https.post(
      `/clearance/departments/${department_id}/required-clearance`,
      { required_clearance }
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getClearanceOverview = async () => {
  try {
    const response = await https.get<
      ApiResponse<{
        requested: Clearance[];
        rejected: Clearance[];
        approved: Clearance[];
        completed: Clearance[];
      }>
    >('/clearance/overview');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const requestStudentClearanceStatus = async (studentId: string) => {
  try {
    const response = await https.get<ApiResponse<RequestClearance>>(
      `/clearance/student/${studentId}`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getStudentClearanceOverview = async (studentId: string) => {
  try {
    const response = await https.get<
      ApiResponse<{
        requested: number;
        approved: number;
        rejected: number;
      }>
    >(`/clearance/student-clearance/student/${studentId}/overview`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const rejectClearance = async (studentId: string, rejectionReason: string) => {
  try {
    const response = await https.post(`/clearance/reject/${studentId}`, {
      rejectionReason,
    });

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const approveClearance = async (studentId: string) => {
  try {
    const response = await https.post(`/clearance/approve/${studentId}`);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getStudentClearance = async (studentId: string) => {
  try {
    const response = await https.get<ApiResponse<SchoolClearance[]>>(
      `/clearance/student/${studentId}`
    );

    return;
  } catch (error) {
    errorHandler(error);
  }
};

const clearanceService = {
  getSchoolClearance,
  addSchoolClearance,
  deleteSchoolClearance,
  getDepartmentsClearance,
  setDepartmentRequiredClearance,
  getClearanceOverview,
  requestStudentClearanceStatus,
  getStudentClearanceOverview,
  rejectClearance,
  approveClearance,
};

export default clearanceService;
