import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import colors from "./themeColor";
import { ThemeType } from "./themeColor"; // Import the correct type

export const lightTheme: ThemeType = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.purple,
    mediumPrimary: colors.mediumPurple,
    lightPrimary: colors.lightPurple,
    background: colors.white,
    text: colors.black,
    buttonText: colors.white,
    placeholderText: colors.silver,
    borderColor: colors.black,
  },
};

export const darkTheme: ThemeType = {
  ...DarkTheme, // Use DarkTheme to inherit dark mode styles
  colors: {
    ...DarkTheme.colors,
    primary: colors.blue,
    mediumPrimary: colors.mediumBlue,
    lightPrimary: colors.lightBlue,
    background: colors.black,
    text: colors.white,
    buttonText: colors.white,
    placeholderText: colors.silver,
    borderColor: colors.white,

  },
};
