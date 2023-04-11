import endpoints from "src/constants/endpoints";
import { privateAxios } from "../request/axiosConfig";

export const getUserDetails = async () => {
  try {
    const response = await privateAxios.get(`${endpoints.PROFILE}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUsers = async (data) => {
  console.log("Here");
  try {
    const response = await privateAxios.get(`${endpoints.USERS}`, {params: data});
    return response.data;
  } catch (error) {
    throw error;
  }
};

