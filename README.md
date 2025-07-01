# 🧠 DevMind

DevMind is a mobile AI assistant application built using **React Native (Expo)** and a **Django REST Framework** backend. Users can register or log in to access a powerful AI assistant powered by **GPT-4o** and **Gemini 2.0 Flash**. The app supports dynamic model selection, theme customization, multilingual support, and personalized AI response behavior.

---

## 📱 Features

### ✅ Authentication
- Secure user authentication (JWT or token-based)
- User profile with avatar, email, username, and join date

### 🤖 AI Assistant
- Chat with powerful LLMs:  
  - `GPT-4o` (OpenAI)  
  - `Gemini-2.0-Flash` (Google)
- Toggle between AI models from settings

### ⚙️ Settings Panel
- **App Appearance**:
  - Light Mode
  - Dark Mode
- **Font Size Selection**:
  - Small
  - Medium
  - Large
- **Language Switch**:  
  - English (`en`)  
  - Persian (`fa`)  
  - Powered by `react-i18next`
- **AI Response Type**:
  - Creativity (more open-ended)
  - Normal (balanced)
  - Reality (factual, concise)

### 👤 User Profile
- View and update:
  - Username
  - Email
  - Profile picture
  - Premium status
  - Joined date

---

## 📦 Tech Stack

| Layer        | Tech                                   |
|--------------|----------------------------------------|
| Mobile       | React Native (Expo)                    |
| Backend      | Django REST Framework                  |
| Authentication | Token-based (DRF TokenAuth)         |
| Internationalization | `i18next`, `react-i18next`    |
| Storage      | AsyncStorage (for persistent settings) |
| AI Models    | GPT-4o (OpenAI), Gemini Flash (Google) |

---

---

## 📸 Demo
<p align="center">
  <img src="https://github.com/Hesam760/DevMind/blob/main/screenshots/ChatScreen.png" width="30%" height="550px" />
  <img src="https://github.com/Hesam760/DevMind/blob/main/screenshots/SettingScreen.png" width="30%" height="530px"/>
  <img src="https://github.com/Hesam760/DevMind/blob/main/screenshots/ProfileScreen.png" width="30%" height="550px"/>
</p>

---
