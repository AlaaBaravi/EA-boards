import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import { mainstyles } from "@/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";

interface LinearBackgroundType {
  children: React.ReactNode;
}

const LinearBackground: FC<LinearBackgroundType> = ({ children }) => {
  return (
    <LinearGradient colors={["#FFFFFF", "#90C9A2"]} style={styles.gradient}>
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );
};

export default LinearBackground;

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject, // Makes the gradient cover the entire screen
    opacity: 0.95,
    justifyContent: "center",
    padding: 24,
  },
  container: {
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
