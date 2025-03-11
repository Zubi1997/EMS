import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 320; // Assume 320 is the baseline width

const normalize = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

// Export screen dimensions
export const screenSizes = {
    width,
    height,
    isSmallScreen: width < 375, // Define your breakpoints here
  };
  
  export const windowWidth = Dimensions.get('window').width;
  export const windowHeight = Dimensions.get('window').height;
  export const fontScale = Dimensions.get('window').fontScale;


  // You can also add more utility functions if needed
  export const isPortrait = () => height >= width;
  export const isLandscape = () => width > height;

export default normalize;
