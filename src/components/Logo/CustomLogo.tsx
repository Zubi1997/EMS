import React from 'react';
import {Image, StyleSheet, View, ImageStyle, ViewStyle} from 'react-native';

type ImageComponentProps = {
  source: any; // Image source, could be a URI or require()
  width?: number; // Custom width
  height?: number; // Custom height
  style?: ViewStyle | ImageStyle; // To add custom styles if required
};

const ImageComponent: React.FC<ImageComponentProps> = ({
  source,
  width = 100,
  height = 100,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={[styles.image, {width, height}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain', // Or 'cover', depending on your needs
  },
});

export default ImageComponent;
