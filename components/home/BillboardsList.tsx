import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const Billboards = () => {
  return (
    <View>
      <View style={styles.rowView}>
        <Text style={mainstyles.title1}>My billboards</Text>
        <Pressable>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.description}>
          You Don’t have Billboards yet, You can add your billboards after Admin
          verify your email
        </Text>
      </View>

      <Pressable
        style={styles.addContainer}
        onPress={() => router.push("/(tabs)/billboards/addBillboards")}
      >
        <Ionicons
          name="add-circle-outline"
          size={16}
          color={Colors.light.secondary}
        />
        <Text style={styles.seeAll}>Add New Billboard</Text>
      </Pressable>
    </View>
  );
};

export default Billboards;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    ...mainstyles.caption,
    color: Colors.light.secondary,
  },
  description: {
    ...mainstyles.title2,
    color: Colors.light.description,
    textAlign: "center",
    marginVertical: 24,
  },
  addContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
});
