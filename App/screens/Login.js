import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { authAPI } from "../services/axios";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";

const Login = () => {
  const [erros, setErrors] = useState("");
  const { login } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const handleLoginSuccess = () => {
    showMessage({
      message: t("login_successful"),
      description: t("welcome_back"),
      type: "success",
      duration: 3000,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("user_login")}</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          authAPI
            .post("login/", values)
            .then((res) => {
              handleLoginSuccess();
              login(res.data.token);
            })
            .catch((err) => {
              console.log(err);
              setErrors(err.response.data.detail || "Login failed");
            });
        }}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <View style={styles.inputsView}>
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
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
              <Text style={{ color: "white", textAlign: "center" }}>
                {t("login")}
              </Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>
              {erros && <Text style={styles.errorText}>{erros}</Text>}
            </Text>
          </View>
        )}
      </Formik>
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
  loginBtn: {
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
});

export { Login };
