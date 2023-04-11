import endpoints from "src/constants/endpoints";
import { axios } from "../request/axiosConfig";

export const login = async (data) => {
  return await axios.post(endpoints.LOGIN, {
    ...data,
  });
};
