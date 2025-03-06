import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from './themeFile';
import { ThemeType } from './themeColor';
import { I18nManager } from 'react-native';
import i18n, { changeLanguage } from '../i18nTranslation/i18n';
import RNRestart from "react-native-restart";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  isDarkTheme: boolean;isRTL: boolean;
  language: string;
  changeAppLanguage: (lang: "en" | "ar") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // To prevent flickering
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);
  const [language, setLanguage] = useState<string>(i18n.language);


  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        const storedDirection = await AsyncStorage.getItem("direction");
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedTheme) {
          setIsDarkTheme(storedTheme === 'dark');
        }
        if (storedDirection) setIsRTL(storedDirection === "rtl");
        if (storedLanguage) setLanguage(storedLanguage);
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setLoading(false); // Theme is loaded
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };
  const changeAppLanguage = async (lang: "en" | "ar") => {
    try {
      await AsyncStorage.setItem("language", lang);
      await AsyncStorage.setItem("direction", lang === "ar" ? "rtl" : "ltr"); // Store direction
      i18n.changeLanguage(lang);
      
      I18nManager.forceRTL(lang === "ar");
      setLanguage(lang);
      setIsRTL(lang === "ar");
  
      RNRestart.Restart(); 
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  if (loading) return null; 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme, isRTL, language, changeAppLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
