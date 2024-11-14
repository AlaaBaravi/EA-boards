import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Constants from "expo-constants";
import { Billboard } from "@/constants/Types";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const BillboardImage = ({ billboard }: { billboard: Billboard }) => {
  const imageUri = `${baseURL}${billboard?.files[0]?.path}`;

  return (
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <Feather
          name="chevron-left"
          size={32}
          color="white"
          onPress={() => router.back()}
        />

        <View style={styles.reviews}>
          <FontAwesome name="star" size={14} color="#E2CC00" />
          <Text style={{ color: "#E2CC00" }}>
            {billboard?.reviews ? billboard.reviews : "0"}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BillboardImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(44, 38, 38, 0.48)",
    padding: 12,
  },
  reviews: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
