import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("isDark");
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      }
    };
    loadTheme();
  }, []);

  const toggleDark = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    await AsyncStorage.setItem("isDark", JSON.stringify(newValue));
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
