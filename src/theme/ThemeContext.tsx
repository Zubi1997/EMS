// // src/contexts/ThemeContext.tsx

// import React, { createContext, useContext, useState } from 'react';
// import { darkTheme, lightTheme } from './themeFile';
// import { ThemeType } from '../types/AllTypes';

// interface ThemeContextType {
//   theme: ThemeType;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

//   const toggleTheme = () => {
//     setIsDarkTheme((prevTheme) => !prevTheme);
//   };

//   const theme = isDarkTheme ? darkTheme : lightTheme;

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };
