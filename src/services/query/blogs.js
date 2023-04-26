import endpoints from 'src/constants/endpoints';
import { privateAxios } from '../request/axiosConfig';

export const getBlogDetails = async (id) => {
  try {
    const response = await privateAxios.get(`${endpoints.BLOGS}${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async (data) => {
  try {
    const response = await privateAxios.get(`${endpoints.BLOGS}`, { params: data });
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
export const createBlog = async (data) => {
  return await privateAxios.post(endpoints.BLOG_CREATE, {
    ...data,
  });
};
