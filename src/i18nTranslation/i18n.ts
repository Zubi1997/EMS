import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart"; // Restart the app when changing language

import en from "./locales/en.json";
import ar from "./locales/ar.json";

// Define the available languages
type Language = "en" | "ar";

// Define the structure of the JSON translation files
interface TranslationResources {
  translation: Record<string, string>;
}

// Define the i18n resources structure
const resources: Record<Language, TranslationResources> = {
  en: { translation: en },
  ar: { translation: ar },
};

// Language detector for i18next
const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
        callback(savedLanguage);
      } else {
        const bestLanguage = RNLocalize.findBestAvailableLanguage(["en", "ar"]);
        callback(bestLanguage?.languageTag || "en");
      }
    } catch (error) {
      console.error("Error detecting language:", error);
      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem("language", language);
    } catch (error) {
      console.error("Error caching user language:", error);
    }
  },
};

// Initialize i18next
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// Function to change language
export const changeLanguage = async (lang: Language): Promise<void> => {
  try {
    await AsyncStorage.setItem("language", lang);
    await i18n.changeLanguage(lang);
    RNRestart.Restart(); // Restart app to apply language change
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export default i18n;
