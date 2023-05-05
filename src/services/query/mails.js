import endpoints from 'src/constants/endpoints';
import { privateAxios } from '../request/axiosConfig';

export const getMailDetails = async (id) => {
  try {
    const response = await privateAxios.get(`${endpoints.MAILS}${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserMails = async (data) => {
  try {
    const response = await privateAxios.get(`${endpoints.USER_MAILS}`, { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getMyMails = async (data) => {
  try {
    const response = await privateAxios.get(`${endpoints.MY_SENT_MAILS}`, { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userSendMail = async (data) => {
  return await privateAxios.post(`${endpoints.USER_SEND_MAIL}${data.receiver}/`, {
    ...data,
  });
};

export const adminMailSend = async (data) => {
  return await privateAxios.post(`${endpoints.ADMIN_SEND_MAILS}`, {
    ...data,
  });
};

export const updateMail = async (data) => {
  return await privateAxios.patch(`${endpoints.MAILS}${data.id}/`, {
    ...data,
  });
};

export const deleteMail = async (id) => {
  return await privateAxios.delete(`${endpoints.MAILS}${id}/`);
};
