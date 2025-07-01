import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "react-native-paper";
import { aiAPI } from "../services/axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { FontSizeContext } from "../context/FontSizeContext";
import { AIContext } from "../context/AISettingContext";

const Chat = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { t, i18n } = useTranslation();
  const { fontSize } = useContext(FontSizeContext);
  const isRTL = i18n.language === "fa" ? true : false;
  const { temperature, LLM } = useContext(AIContext);
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsSending(true);
    let res;

    try {
      res = await aiAPI.post("ask/", {
        question: inputText,
        temperature: temperature,
        model: LLM,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.answer || "No answer",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: t("something_went_wrong") },
      ]);
    }
    setIsSending(false);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={{ fontSize: fontSize }}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      {messages.length === 0 && (
        <View style={styles.welcomecontainer}>
          <Text style={[styles.welcomeText, { color: theme.colors.primary }]}>
            👋 {t("welcome_message")}
          </Text>
        </View>
      )}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
      />
      <View
        style={[
          styles.inputContainer,
          { flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
      >
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder={t("ayq")}
          style={[
            styles.input,
            { marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 },
          ]}
          keyboardType="default"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={isSending}
        >
          <Text style={styles.sendButtonText}>
            {isSending ? (
              <ActivityIndicator size={"small"} color="#fff" />
            ) : (
              <Ionicons name="navigate-outline" color="#fff" size={22} />
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 80,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 25,
  },
  userMessage: {
    backgroundColor: "#77c1da",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-start",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "#424F7F",
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: "#0E2A4C",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 10,
  },
  welcomecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export { Chat };
