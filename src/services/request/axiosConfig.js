import Axios from 'axios'

console.log("BASE", process.env.REACT_APP_BASE_URL)
export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const privateAxios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});