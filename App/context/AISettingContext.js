import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [temperature, setTemperature] = useState(1);
  const [LLM, setLLM] = useState("GPT");

  const fetchAISetting = async () => {
    try {
      const temp = await AsyncStorage.getItem("temperature");
      const llmType = await AsyncStorage.getItem("llm");
      const tempMap = { Reality: 0.4, Normal: 1, Creativity: 1.6 };
      setTemperature(tempMap[temp]);
      setLLM(llmType);
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  useEffect(() => {
    fetchAISetting();
  }, []);

  return (
    <AIContext.Provider
      value={{ temperature, setTemperature, LLM, setLLM, fetchAISetting }}
    >
      {children}
    </AIContext.Provider>
  );
};
