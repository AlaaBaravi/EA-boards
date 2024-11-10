import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Company } from "@/constants/Types";
import Constants from "expo-constants";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const CompanyCard = ({ company }: { company: Company }) => {
  const imageUri = `${baseURL}/${company.image}`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{company.name}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 4,
    gap: 8,
  },
  image: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 8,
  },
  overlay: {
    borderRadius: 8,

    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
});
