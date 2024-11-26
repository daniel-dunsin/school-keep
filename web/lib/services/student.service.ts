import { https } from '../configs/http.config';
import { StudentStatus } from '../schemas/enums';
import { CreateStudentDto, GetStudentsQuery } from '../schemas/interfaces';
import { ApiResponse, Student } from '../schemas/types';
import { errorHandler } from '../utils';

const getAllStudents = async (query: GetStudentsQuery) => {
  let url = '/student?';

  if (query?.search) {
    url += `search=${query.search}&`;
  }

  if (query?.department) {
    url += `department_id=${query?.department?._id}&`;
  }

  try {
    const response = await https.get<ApiResponse<Student[]>>(url);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const createStudent = async (createStudentDto: CreateStudentDto) => {
  try {
    const response = await https.post('/student', createStudentDto);

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getStudent = async (studentId: string) => {
  try {
    const response = await https.get<ApiResponse<Student>>(
      `/student/${studentId}`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const updateStudentStatus = async (
  studentId: string,
  status: StudentStatus
) => {
  try {
    const response = await https.patch(`/student/${studentId}/status`, {
      status,
    });

    return response?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const studentService = {
  getAllStudents,
  createStudent,
  getStudent,
  updateStudentStatus,
};

export default studentService;
