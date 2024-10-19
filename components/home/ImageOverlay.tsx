import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";

const ImageOverlay = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/billboard.jpeg")} // Replace with your image URL
        style={styles.backgroundImage}
        resizeMode="cover" // Use cover or contain as needed
      >
        <LinearGradient
          colors={["#2C262633", "#2C2626"]} // Customize colors and transparency
          style={styles.gradient}
        >
          <Text style={styles.text}>
            Your business is a few clicks away from becoming the next trend..
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ImageOverlay;

const styles = StyleSheet.create({
  container: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
});
