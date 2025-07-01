import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "react-native-paper";
import { authAPI } from "../services/axios";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { FontSizeContext } from "../context/FontSizeContext";

const Profile = () => {
  const theme = useTheme();
  const { userToken, logout, userData, setUserData } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language == "fa" ? true : false;
  const { fontSize } = useContext(FontSizeContext);

  const formatDate = (rawDate) => {
    return new Date(rawDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    Alert.alert(
      t("logout_confirmation"),
      t("are_you_sure_logout"),
      isRTL
        ? [
            { text: t("yes"), onPress: () => logout() },
            { text: t("cancel"), style: "cancel" },
          ]
        : [
            { text: t("cancel"), style: "cancel" },
            { text: t("yes"), onPress: () => logout() },
          ],
      { cancelable: false }
    );
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      uploadProfilePicture(result.assets[0]);
    }
  };

  const uploadProfilePicture = async (image) => {
    const formData = new FormData();
    formData.append("profile_picture", {
      uri: image.uri,
      name: `profile_${userData.id}.jpg`,
      type: "image/jpeg",
    });

    try {
      const response = await authAPI.put("profile/update/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await authAPI.get("profile/").then((res) => {
        setUserData(res.data);
      });
      alert(t("profile_picture_updated"));
    } catch (err) {
      console.error(err);
      alert(t("upload_failed"));
    }
  };

  return (
    <View style={styles.container}>
      {userData?.profile_picture && (
        <Image
          source={{ uri: userData.profile_picture }}
          style={styles.avatar}
        />
      )}
      <TouchableOpacity onPress={pickImage}>
        <Button
          icon="camera"
          mode="contained"
          style={[styles.uploadBtn, { fontSize: fontSize }]}
        >
          {t("add_or_update_profile_picture")}
        </Button>
      </TouchableOpacity>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {t("username")} :
        </Text>
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {userData?.username}
        </Text>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {t("email")} :
        </Text>
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {userData?.email}
        </Text>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {t("date_joined")} :
        </Text>
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {formatDate(userData?.date_joined)}
        </Text>
      </View>
      <View
        style={[styles.rows, { flexDirection: isRTL ? "row-reverse" : "row" }]}
      >
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {t("premium_user")} :
        </Text>
        <Text
          style={[
            styles.texts,
            { color: theme.colors.text, fontSize: fontSize },
          ]}
        >
          {userData?.is_premium ? (
            <Ionicons name="checkmark-circle-outline" color="green" size={32} />
          ) : (
            <Ionicons name="close-circle-outline" color="red" size={32} />
          )}
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Button
          mode="contained-tonal"
          style={[styles.logout, { fontSize: fontSize }]}
        >
          {t("logout")}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  rows: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
  },
  texts: {
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#f44336",
    width: "50%",
    alignSelf: "center",
    marginTop: 8,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 20,
  },
  uploadBtn: {
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
});

export { Profile };
