import React, { useContext, useEffect } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as ProverPaper,
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
  PaperProvider,
} from "react-native-paper";
import { BottomTab } from "./components/BottomTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Signup, Login } from "./screens";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import FlashMessage from "react-native-flash-message";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function App() {
  const { userToken, appReady } = useContext(AuthContext);
  const { isDark, toggleDark } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language == "fa" ? true : false;

  useEffect(() => {
    const hideSplash = async () => {
      if (appReady) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [appReady]);

  if (!appReady) return null;

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "white",
      text: "black",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "black",
      text: "white",
    },
  };

  const theme = isDark ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userToken ? (
            <>
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen name="Main">
                {(props) => <BottomTab {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage
        position="top"
        textStyle={{ textAlign: isRTL ? "right" : "left" }}
        titleStyle={{ textAlign: isRTL ? "right" : "left" }}
      />
    </PaperProvider>
  );
}
