import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, aiAPI } from "../services/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [appReady, setAppReady] = useState(false);

  const login = async (token) => {
    try {
      setUserToken(token);
      await AsyncStorage.setItem("userToken", token);
      authAPI.defaults.headers.common["Authorization"] = `Token ${token}`;
      aiAPI.defaults.headers.common["Authorization"] = `Token ${token}`;
      const res = await authAPI.get("profile/");
      setUserData(res.data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
    authAPI.defaults.headers.common["Authorization"] = ``;
    aiAPI.defaults.headers.common["Authorization"] = ``;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setUserToken(token);
          authAPI.defaults.headers.common["Authorization"] = `Token ${token}`;
          aiAPI.defaults.headers.common["Authorization"] = `Token ${token}`;
          const res = await authAPI.get("profile/");
          setUserData(res.data);
        }
      } catch (error) {
        console.error("App init error:", error);
      } finally {
        setAppReady(true);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        appReady,
        setAppReady,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
