import React from "react";
import { StatusBar } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FontSizeProvider } from "./context/FontSizeContext";
import { AIProvider } from "./context/AISettingContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import AppInner from "./AppInner";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <AuthProvider>
        <ThemeProvider>
          <AIProvider>
            <FontSizeProvider>
              <I18nextProvider i18n={i18n}>
                <AppInner />
              </I18nextProvider>
            </FontSizeProvider>
          </AIProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
