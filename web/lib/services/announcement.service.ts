import { https } from '../configs/http.config';
import {
  CreateAnnouncementDto,
  GetAnnouncementsQuery,
} from '../schemas/interfaces';
import { Announcement, ApiResponse } from '../schemas/types';
import {
  convertImageToBase64,
  errorHandler,
  getApiQueryString,
} from '../utils';

const createAnnouncement = async (
  createAnnouncementDto: CreateAnnouncementDto
) => {
  const data = { ...createAnnouncementDto };

  if (data.image) {
    data.image = <string>await convertImageToBase64(data.image as File);
  }

  try {
    const response = await https.post('/announcement', data);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getAnnouncements = async (query?: GetAnnouncementsQuery) => {
  const url = getApiQueryString('/announcement', query);

  try {
    const response = await https.get<ApiResponse<Announcement[]>>(url);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error);
  }
};

const announcementService = {
  createAnnouncement,
  getAnnouncements,
};

export default announcementService;
