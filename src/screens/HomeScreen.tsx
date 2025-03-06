import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";


const HomeScreen = () => {
  const { toggleTheme, isDarkTheme, language, changeAppLanguage } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#222" : "#fff" }]}>
      <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
        Current Theme: {isDarkTheme ? "Dark" : "Light"}
      </Text>
      <Button
        title={"change theme"}
        onPress={() => toggleTheme()}
      />
      <Button
        title={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        onPress={() => changeAppLanguage(language === "en" ? "ar" : "en")}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
