import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import { Region } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const LocationCard = ({ location }: { location: Region }) => {
  const regionImage = `${baseURL}/${location.image}`;

  return (
    <View style={styles.locationContainer}>
      <Image source={{ uri: regionImage }} style={styles.image} />
      <Text style={mainstyles.title1}>{location.name_en}</Text>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  locationContainer: { marginRight: 8, alignItems: "center", gap: 8 },
  image: { width: 148, height: 148, borderRadius: 12 },
});
