import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Chat, Setting, Profile } from "../screens";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const BottomTab = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#6E85E0" }}
      initialRouteName="Chat"
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t("profile"),
          tabBarColor: "red",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: t("chat"),
          tabBarColor: "red",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        options={{
          tabBarLabel: t("setting"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog-outline" color={color} size={size} />
          ),
        }}
      >
        {() => <Setting isDark={props.isDark} setIsDark={props.setIsDark} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export { BottomTab };
