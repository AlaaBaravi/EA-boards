import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width;

const WelcomeImage = () => {
  return (
    <Image
      source={require("@/assets/images/welcome-image.png")}
      style={{ width: screenWidth * 0.9, height: screenWidth * 0.6 }}
      resizeMode="cover"
    />
  );
};

export default WelcomeImage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
