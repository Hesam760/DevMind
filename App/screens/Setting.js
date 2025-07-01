import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { Menu, Button, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontSizeContext } from "../context/FontSizeContext";
import { AuthContext } from "../context/AuthContext";
import { AIContext } from "../context/AISettingContext";

const Setting = (props) => {
  const theme = useTheme();
  const [menus, setMenus] = useState({
    lang: false,
    fontsize: false,
    llm: false,
    ansType: false,
  });
  const [currentFontSizeName, setCurrentFontSizeName] = useState();
  const { t, i18n } = useTranslation();
  const { userData } = useContext(AuthContext);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [llm, setLLM] = useState("GPT");
  const [answerType, setAnswerType] = useState("Normal");
  const { temperature, fetchAISetting, LLM } = useContext(AIContext);
  const { isDark, toggleDark } = useContext(ThemeContext);
  const { fontSize, fetchFontSize } = useContext(FontSizeContext);

  const openMenu = (menu) => setMenus(() => ({ [menu]: true }));
  const closeMenu = (menu) => setMenus(() => ({ [menu]: false }));

  useEffect(() => {
    const tempLabelMap = {
      0.4: "Reality",
      1: "Normal",
      1.6: "Creativity",
    };
    const fontSizeMap = {
      12: "Small",
      16: "Medium",
      24: "Large",
    };
    setCurrentFontSizeName(fontSizeMap[fontSize]);
    setAnswerType(tempLabelMap[temperature]);
    setLLM(LLM);
  }, []);

  const isRTL = i18n.language == "fa" ? true : false;
  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    closeMenu("lang");
  };

  const handleSelectFontSize = async (size) => {
    setCurrentFontSizeName(size);
    await AsyncStorage.setItem("fontSize", size);
    fetchFontSize();
    closeMenu("fontsize");
  };

  const handleLLM = async (model) => {
    setLLM(model);
    await AsyncStorage.setItem("llm", model);
    fetchAISetting();
    closeMenu("llm");
  };

  const handleAnsType = async (type) => {
    setAnswerType(type);
    await AsyncStorage.setItem("temperature", type);
    fetchAISetting();
    closeMenu("ansType");
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { fontSize: fontSize, color: theme.colors.text },
          ]}
        >
          {t("appearance_mode")}
        </Text>
        <TouchableOpacity onPress={toggleDark}>
          {isDark ? (
            <Ionicons
              name="sunny-outline"
              color={theme.colors.text}
              size={fontSize === 12 ? 20 : 25}
            />
          ) : (
            <Ionicons
              name="moon-outline"
              color={theme.colors.text}
              size={fontSize === 12 ? 20 : 25}
            />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { fontSize: fontSize, color: theme.colors.text },
          ]}
        >
          {t("language")}
        </Text>
        <Menu
          visible={menus.lang}
          onDismiss={() => closeMenu("lang")}
          anchor={
            <Button
              onPress={() => openMenu("lang")}
              mode="outlined"
              style={{ width: fontSize == 12 ? 80 : 120 }}
            >
              {selectedLanguage}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              handleSelectLanguage("ENG");
            }}
            title="en"
            leadingIcon={() => (
              <Ionicons
                name="language"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              handleSelectLanguage("fa");
            }}
            title="fa"
            leadingIcon={() => (
              <Ionicons
                name="language"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
          />
        </Menu>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { fontSize: fontSize, color: theme.colors.text },
          ]}
        >
          {t("font_size")}
        </Text>
        <Menu
          visible={menus.fontsize}
          onDismiss={() => closeMenu("fontsize")}
          anchor={
            <Button
              onPress={() => openMenu("fontsize")}
              mode="outlined"
              style={{ width: fontSize == 12 ? 80 : 120 }}
            >
              {t(currentFontSizeName)}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              handleSelectFontSize("Small");
            }}
            title={t("Small")}
            leadingIcon={() => (
              <Ionicons name="remove-outline" size={22} color="#6E85E0" />
            )}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              handleSelectFontSize("Medium");
            }}
            title={t("Medium")}
            leadingIcon={() => (
              <Ionicons
                name="reorder-two-outline"
                size={22}
                color="#6E85E0"
                style={{ marginTop: 1 }}
              />
            )}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              handleSelectFontSize("Large");
            }}
            title={t("Large")}
            leadingIcon={() => (
              <Ionicons
                name="reorder-three-outline"
                size={22}
                color="#6E85E0"
                style={{ marginTop: 2 }}
              />
            )}
          ></Menu.Item>
        </Menu>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { fontSize: fontSize, color: theme.colors.text },
          ]}
        >
          {t("llm")}
        </Text>
        <Menu
          visible={menus.llm}
          onDismiss={() => closeMenu("llm")}
          anchor={
            <Button
              onPress={() => openMenu("llm")}
              mode="outlined"
              style={{ width: fontSize == 12 ? 80 : 120 }}
            >
              {llm}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              handleLLM("GPT");
            }}
            title="GPT-4o"
            leadingIcon={() => (
              <Ionicons
                name="sparkles-outline"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              handleLLM("Gemini");
            }}
            title="Gemini 2.0 Flash"
            leadingIcon={() => (
              <Ionicons
                name="sparkles-outline"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
            disabled={!userData?.is_premium}
          />
        </Menu>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { fontSize: fontSize, color: theme.colors.text },
          ]}
        >
          {t("type_of_ans")}
        </Text>
        <Menu
          visible={menus.ansType}
          onDismiss={() => closeMenu("ansType")}
          anchor={
            <Button
              onPress={() => openMenu("ansType")}
              mode="outlined"
              style={{ width: fontSize == 12 ? 80 : 120 }}
            >
              {t(answerType)}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              handleAnsType("Reality");
            }}
            title={t("Reality")}
            leadingIcon={() => (
              <Ionicons
                name="diamond-outline"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              handleAnsType("Normal");
            }}
            title={t("Normal")}
            leadingIcon={() => (
              <Ionicons
                name="diamond-outline"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              handleAnsType("Creativity");
            }}
            title={t("Creativity")}
            leadingIcon={() => (
              <Ionicons
                name="diamond-outline"
                size={18}
                color="#6E85E0"
                style={{ marginTop: 4 }}
              />
            )}
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 40,
  },
  rows: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  texts: {
    fontWeight: "bold",
  },
});

export { Setting };
