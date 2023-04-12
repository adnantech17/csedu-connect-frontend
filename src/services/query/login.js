import endpoints from 'src/constants/endpoints';
import { axios, privateAxios } from '../request/axiosConfig';

export const login = async (data) => {
  return await axios.post(endpoints.LOGIN, {
    ...data,
  });
};
export const logout = async () => {
  return await privateAxios.post(endpoints.LOGOUT, {});
};
