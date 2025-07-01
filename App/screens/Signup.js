import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { authAPI } from "../services/axios";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Menu, PaperProvider, Button, Divider } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

const Signup = (props) => {
  const { login } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("Lang");
  const [visibleMenu1, setVisibleMenu1] = useState(false);

  const closeMenu1 = () => setVisibleMenu1(false);
  const openMenu1 = () => setVisibleMenu1(true);
  const isRTL = i18n.language == "fa" ? true : false;
  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    closeMenu1();
  };

  const handleLoginSuccess = () => {
    showMessage({
      message: t("login_successful"),
      description: t("welcome_back"),
      type: "success",
      duration: 3000,
    });
  };
  const theme = useTheme();
  const schema = yup.object({
    email: yup
      .string()
      .email("Not acceptable email")
      .required("Email is required"),

    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),

    password: yup
      .string()
      .min("8", "Minimum length is 8 characters")
      .required("password is required"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.welcomeText, { color: theme.colors.primary }]}>
          👋{t("welcome_message")}
        </Text>
      </View>
      <Text style={styles.text}>{t("signup")}</Text>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
          authAPI
            .post("register/", values)
            .then((res) => {
              handleLoginSuccess();
              login(res.data.token);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <View style={styles.inputsView}>
            <TextInput
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder={t("email")}
              style={[
                styles.inputTexts,
                i18n.language === "fa" && {
                  textAlign: "right",
                  writingDirection: "rtl",
                },
              ]}
              placeholderTextColor="#6600f5"
              onChangeText={handleChange("email")}
              value={values.email}
            />
            <Text style={styles.errorText}> {errors.email} </Text>
            <TextInput
              textContentType="username"
              keyboardType="default"
              placeholder={t("username")}
              style={[
                styles.inputTexts,
                i18n.language === "fa" && {
                  textAlign: "right",
                  writingDirection: "rtl",
                },
              ]}
              placeholderTextColor="#6600f5"
              onChangeText={handleChange("username")}
              value={values.username}
            />
            <Text style={styles.errorText}> {errors.username} </Text>
            <TextInput
              textContentType="password"
              keyboardType="default"
              placeholder={t("password")}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              style={[
                styles.inputTexts,
                i18n.language === "fa" && {
                  textAlign: "right",
                  writingDirection: "rtl",
                },
                {
                  color: "#000",
                },
              ]}
              placeholderTextColor="#6600f5"
              value={values.password}
            />
            <Text style={styles.errorText}> {errors.password} </Text>
            <TouchableOpacity style={styles.sumbmitBtn} onPress={handleSubmit}>
              <Text style={{ color: "white", textAlign: "center" }}>
                {t("submit")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
        <Text style={{ color: "blue", marginTop: 20 }}>
          {t("have_account")}
        </Text>
      </TouchableOpacity>
      <Menu
        visible={visibleMenu1}
        onDismiss={closeMenu1}
        anchor={
          <Button
            onPress={openMenu1}
            mode="outlined"
            style={{ width: 110, marginTop: 30 }}
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
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handleSelectLanguage("fa");
          }}
          title="fa"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#e0e0e0",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    marginBottom: 50,
  },
  inputsView: {
    width: "100%",
    alignItems: "center",
  },
  inputTexts: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 7,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  sumbmitBtn: {
    backgroundColor: "green",
    width: "90%",
    padding: 14,
    borderRadius: 7,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 10,
  },
});

export { Signup };
