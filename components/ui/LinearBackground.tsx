import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import { mainstyles } from "@/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";

interface LinearBackgroundType {
  children: React.ReactNode;
}

const LinearBackground: FC<LinearBackgroundType> = ({ children }) => {
  return (
    // <ImageBackground
    //   style={mainstyles.container}
    //   source={require("@/assets/images/background.jpg")}
    // >
    <LinearGradient colors={["#FFFFFF", "#90C9A2"]} style={styles.gradient}>
      <View style={styles.container}>{children}</View>
    </LinearGradient>
    // </ImageBackground>
  );
};

export default LinearBackground;

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject, // Makes the gradient cover the entire screen
    opacity: 0.95,
  },
  container: {
    ...mainstyles.container,
    alignItems: "center",
    justifyContent: "center",
  },
});
