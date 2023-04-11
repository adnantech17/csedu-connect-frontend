import Axios from 'axios';

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_LIVE,
});

export const privateAxios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_LIVE,
});
