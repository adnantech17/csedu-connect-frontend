import endpoints from 'src/constants/endpoints';
import { privateAxios } from '../request/axiosConfig';

export const getEventDetails = async (id) => {
  try {
    const response = await privateAxios.get(`${endpoints.EVENTS}${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async (data) => {
  try {
    const response = await privateAxios.get(`${endpoints.EVENTS}`, { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createComment = async (data) => {
  return await privateAxios.post(endpoints.COMMENTS, {
    ...data,
  });
};

export const subscribe = async (id) => {
  return await privateAxios.post(`${endpoints.EVENTS}${id}/subscribe/`);
};

export const unsubscribe = async (id) => {
  return await privateAxios.delete(`${endpoints.EVENTS}${id}/subscribe/`);
};

export const createEvent = async (data) => {
  return await privateAxios.post(endpoints.EVENTS, {
    ...data,
  });
};

export const deleteEvent = async (id) => {
  return await privateAxios.delete(`${endpoints.EVENTS}${id}/`);
};
