import { LocalStorage } from "../storage/localstorage";
import { STORAGE_KEY_ACCESS_TOKEN } from "src/constants/localstorage";

const getToken = () => {
  return LocalStorage.getData(localStorage, STORAGE_KEY_ACCESS_TOKEN);
};

export const setTokenInHeader = (config) => {
  config.headers["Authorization"] = `Token ${getToken()}`;
  return config;
};

export const redirectIfUnauthorized = (err) => {
  console.log(err);
};

export const redirectIfApiDown = (err) => {
  if (typeof err.response === "undefined" && err.message == "Network Error") {
    
  }
};
