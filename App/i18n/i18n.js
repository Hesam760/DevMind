import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (cb) => {
    const savedLang = await AsyncStorage.getItem("user-language");
    cb(savedLang || "en");
  },
  init: () => {},
  cacheUserLanguage: async (lng) => {
    await AsyncStorage.setItem("user-language", lng);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          appearance_mode: "Appearance Mode",
          setting: "Setting",
          language: "Language",
          logout: "Logout",
          profile: "Profile",
          chat: "Chat",
          username: "Username",
          email: "Email",
          premium_user: "Premium User",
          llm: "LLM",
          ayq: "ask your question...",
          add_or_update_profile_picture: "Add or Update Profile Picture",
          welcome_message: "Welcome to the DevMind!",
          logout_confirmation: "Logout Confirmation",
          are_you_sure_logout: "Are you sure you want to logout?",
          cancel: "Cancel",
          yes: "Yes",
          font_size: "Font Size",
          signup: "Signup",
          password: "Password",
          submit: "Submit",
          have_account: "Already have an account? Login",
          user_login: "Users Login",
          login: "Login",
          date_joined: "Date joined",
          Small: "Small",
          Medium: "Medium",
          Large: "Large",
          profile_picture_updated: "Profile picture updated",
          upload_failed: "Profile picture update failed.",
          login_successful: "Login Successful",
          welcome_back: "Welcome Back!",
          type_of_ans: "Type of Answer:",
          Reality: "Reality",
          Normal: "Normal",
          Creativity: "Creativity",
          something_went_wrong: "Something went wrong. Try again.",
        },
      },
      fa: {
        translation: {
          welcome: "خوش آمدید",
          setting: "تنظیمات",
          appearance_mode: "حالت نمایش",
          language: "زبان",
          profile: "اطلاعات کاربری",
          chat: "چت",
          logout: "خروج",
          username: "نام کاربری",
          email: "ایمیل",
          premium_user: "کاربر پریمیوم",
          llm: "مدل زبانی",
          ayq: "سوال خود را بپرسید...",
          add_or_update_profile_picture: "افزودن یا به‌روزرسانی عکس پروفایل",
          welcome_message: "  به برنامه دستیار  DevMind خوش آمدید!",
          logout_confirmation: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
          logout_confirmation: "تایید خروج",
          are_you_sure_logout: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
          cancel: "لغو",
          yes: "تایید",
          font_size: "اندازه فونت",
          signup: "ثبت نام",
          password: "پسوورد",
          submit: "ثبت",
          have_account: "آیا اکانت دارید؟ وارید شوید",
          user_login: "ورود کاربران",
          login: "ورود",
          date_joined: "تاریخ ورود",
          Small: "کوچک",
          Medium: "متوسط",
          Large: "بزرگ",
          profile_picture_updated: "عکس پروفایل شما با موفقیت آپدیت شد.",
          upload_failed: "آپدیت عکس پروفایل ناموفق.",
          login_successful: "ورود با موفقیت انجام شد",
          welcome_back: "خوش آمدید!",
          type_of_ans: "نوع پاسخ مدل",
          Reality: "واقع گرایانه",
          Normal: "معمولی",
          Creativity: "خلاقانه",
          something_went_wrong: "خطایی رخ داده است. بعدا تلاش کنید",
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
