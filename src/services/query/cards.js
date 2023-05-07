import endpoints from 'src/constants/endpoints';
import { privateAxios } from '../request/axiosConfig';

export const getCards = async (data) => {
  try {
    const response = await privateAxios.get(`${endpoints.CARDS}`, { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCard = async (data) => {
  return await privateAxios.post(`${endpoints.CARDS}`, {
    ...data,
  });
};
