import endpoints from "src/constants/endpoints";
import { privateAxios } from "../request/axiosConfig";

export const getUserDetails = async () => {
  try {
    const response = await privateAxios.get(`${endpoints.PROFILE}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
