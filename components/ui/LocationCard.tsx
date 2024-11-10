import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Region } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";

const imageMap: { [key: string]: any } = {
  "images/regions/1.jpg": require("@/assets/images/regions/1.jpg"),
  "images/regions/2.jpg": require("@/assets/images/regions/2.jpg"),
  "images/regions/3.jpg": require("@/assets/images/regions/3.jpg"),
  "images/regions/4.jpg": require("@/assets/images/regions/4.jpg"),
};

const getLocalImage = (path: string): any => {
  return imageMap[path] || null;
};

const LocationCard = ({ location }: { location: Region }) => {
  const { name_en, image } = location;
  const localImage = getLocalImage(image);

  return (
    <View style={{ marginRight: 8, alignItems: "center", gap: 8 }}>
      <Image
        source={localImage}
        style={{ width: 148, height: 148, borderRadius: 12 }}
      />
      <Text style={mainstyles.title1}>{name_en}</Text>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({});
