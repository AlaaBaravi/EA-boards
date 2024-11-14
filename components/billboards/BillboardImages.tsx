import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Billboard } from "@/constants/Types";
import Constants from "expo-constants";
import { Colors } from "@/constants/Colors";
import { mainstyles } from "@/constants/Styles";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const BillboardImages = ({ billboard }: { billboard: Billboard }) => {
  const imageUri = `${baseURL}${billboard?.files[0]?.path}`;
  const files = billboard.files;
  const [showImages, setShowImages] = useState(false);

  return (
    <View style={styles.container}>
      {!showImages && (
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}></View>
        </ImageBackground>
      )}

      {showImages &&
        files.map((file, index) => (
          <ImageBackground
            source={{ uri: `${baseURL}${files.at(index)?.path}` }}
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}></View>
          </ImageBackground>
        ))}

      {files.length > 1 && (
        <Pressable
          style={styles.row}
          onPress={() => setShowImages((prev) => !prev)}
        >
          <FontAwesome6 name="images" size={20} color={Colors.light.primary} />
          <Text style={styles.text}>
            {showImages ? "Hide Photos" : "Show All Billboard Photos"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default BillboardImages;

const styles = StyleSheet.create({
  container: { gap: 12 },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  text: { ...mainstyles.caption, color: Colors.light.primary },
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
});
