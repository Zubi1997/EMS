import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Vibration } from "react-native";
import SplashScreen from "react-native-splash-screen";
import ImageComponent from "../components/Image/CustomImage";
import images from "../assets/mageAssets";

// Random Gym Quotes Array
const gymQuotes = [
  "Push Yourself Beyond Limits!",
  "Train Hard, Stay Strong!",
  "The Pain You Feel Today, Is The Strength You Gain Tomorrow!",
  "Leg Day? No Excuses!",
  "No Pain, No Gain!",
];

const AppSplashScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [quote, setQuote] = useState("");

  useEffect(() => {
    SplashScreen.hide();

    // Pick a random gym quote
    setQuote(gymQuotes[Math.floor(Math.random() * gymQuotes.length)]);

    // Run animations in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Vibrate slightly when animation completes (Gym feel!)
      Vibration.vibrate(100);
    });

    // Play Dumbbell Drop Sound
    // const gymSound = new Sound(require("../../assets/sounds/dumbbell.mp3"), Sound.MAIN_BUNDLE, (error) => {
    //   if (!error) gymSound.play();
    // });

    // Navigate to Login Screen after Splash
    setTimeout(() => {
      // gymSound.release();
      navigation.replace("Login");
    }, 3500);
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Gym Logo */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <ImageComponent height={200} width={200} source={images.EMSlogo} />

        
      </Animated.View>

      {/* <Animated.Text style={[styles.quote, { opacity: fadeAnim, color: "#fff" }]}>
        {quote}
      </Animated.Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 220,
    height: 220,
  },
 
  quote: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});

export default AppSplashScreen;
