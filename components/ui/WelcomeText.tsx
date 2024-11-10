import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";

interface WelcomeTextProps {
  text: string;
}

const WelcomeText: FC<WelcomeTextProps> = ({ text }) => {
  return <Text style={styles.welcome}>{text}</Text>;
};

export default WelcomeText;

const styles = StyleSheet.create({
  welcome: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    color: Colors.light.primary,
  },
});
