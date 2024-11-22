import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { mainstyles } from "@/constants/Styles";
import { Billboard } from "@/constants/Types";

const Location = ({ billboard }: { billboard: Billboard }) => {
  return (
    <View style={styles.row}>
      <Octicons name="location" size={24} color="black" />
      <Text style={mainstyles.title1}>{billboard!.location}</Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
});
