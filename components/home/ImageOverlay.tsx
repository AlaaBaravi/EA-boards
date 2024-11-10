import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/store/authContext";
import { mainstyles } from "@/constants/Styles";

const ImageOverlay = () => {
  const { state } = useAuth();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/billboard.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#2C262633", "#2C2626"]}
          style={styles.gradient}
        >
          {state.user.type === "individual" && (
            <Text
              style={[mainstyles.title1, { color: "white", marginBottom: 8 }]}
            >
              Your Ad, Everywhere!
            </Text>
          )}
          <Text style={[mainstyles.title2, styles.text]}>
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
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 16,
    lineHeight: 24,
  },
});
