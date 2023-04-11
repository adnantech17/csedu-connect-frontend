import endpoints from 'src/constants/endpoints';
import { privateAxios } from '../request/axiosConfig';

export const getUserDetails = async () => {
  try {
    const response = await privateAxios.get(`${endpoints.PROFILE}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (data) => {
  try {
    const response = await privateAxios.get(`${endpoints.USERS}`, { params: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  return await privateAxios.post(endpoints.REGISTER, {
    ...data,
  });
};

export const createReferrals = async (data) => {
  return await privateAxios.post(endpoints.REFERRALS, {
    ...data,
  });
};

export const updateUserProfile = async (data) => {
  return await privateAxios.patch(`${endpoints.PROFILES}`, {
    ...data,
  });
};
