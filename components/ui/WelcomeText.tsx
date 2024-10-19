import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const WelcomeText = () => {
  return <Text style={styles.welcome}>Welcome</Text>;
};

export default WelcomeText;

const styles = StyleSheet.create({
  welcome: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    color: Colors.light.secondary,
  },
});
