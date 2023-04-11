import { responsiveFontSizes } from "@mui/material";
import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_REFRESH_TOKEN,
} from "src/constants/localstorage";
import { login } from "src/services/query/login";
import { getUserDetails } from "src/services/query/user";
import { privateAxios } from "src/services/request/axiosConfig";
import { setTokenInHeader } from "src/services/request/axiosHelper";
import { LocalStorage } from "src/services/storage/localstorage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  const [userData, setUserData] = useState();

  const getToken = useCallback(() => {
    return LocalStorage.getData(localStorage, STORAGE_KEY_ACCESS_TOKEN);
  }, []);

  const initialize = useCallback(async () => {
    const initialData = getToken();
    if (!initialData) return;
    setTokenInHeader(privateAxios.defaults);

    setIsFetchingUserData(true);
    try {
      const data = await getUserDetails();
      setUserData(data);
    } catch (error) {
    } finally {
      setIsFetchingUserData(false);
    }
  }, [getToken]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSuccess = useCallback(
    (data) => {
      LocalStorage.setData(
        localStorage,
        STORAGE_KEY_ACCESS_TOKEN,
        data.access_token
      );
      LocalStorage.setData(
        localStorage,
        STORAGE_KEY_REFRESH_TOKEN,
        data.refresh_token
      );
      initialize();
    },
    [initialize]
  );

  const logout = useCallback(() => {
    LocalStorage.removeData(localStorage, STORAGE_KEY_ACCESS_TOKEN);
    LocalStorage.removeData(localStorage, STORAGE_KEY_REFRESH_TOKEN);
    setUserData(undefined);
  }, []);

  const loginToAccount = useCallback(
    async (params) => {
      try {
        const res = await login(params);
        // if (!data.success) throw data;
        // if (data.success) 
        handleSuccess(res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    [handleSuccess]
  );

  // const updateProfile = useCallback(
  //   async (data) => {
  //     try {
  //       const res = await updateUserDetails(data);
  //       if (!res.success) throw res;
  //       if (res.success) setUserData(res.data);
  //       return res;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   [setUserData]
  // );

  useEffect(() => { }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: !!userData,
        isFetchingUserData,
        userData,
        setUserData,
        getToken,
        loginToAccount,
        // updateProfile,
        logout,
        onLogin: handleSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
