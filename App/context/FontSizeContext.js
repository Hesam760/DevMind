import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const fetchFontSize = async () => {
    try {
      const size = await AsyncStorage.getItem("fontSize");
      const fontMap = { Small: 12, Medium: 16, Large: 24 };
      setFontSize(fontMap[size] || 16);
    } catch (error) {
      console.error("Failed to load font size:", error);
    }
  };

  useEffect(() => {
    fetchFontSize();
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, fetchFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
