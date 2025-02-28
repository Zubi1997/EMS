import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import colors from "./themeColor";

export const lightTheme: any = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    white: colors.white,
    black: colors.black,
  },
};

export const darkTheme: any = {
  ...DarkTheme.colors,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    white: colors.white,
    black: colors.black,
  },
};
