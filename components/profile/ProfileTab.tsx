import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Href, Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ProfileTabProps {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  to: Href;
}

const ProfileTab: FC<ProfileTabProps> = ({ title, icon, to }) => {
  return (
    <Link key={icon} href={to} asChild>
      <Pressable
        android_ripple={{ color: Colors.light.primary }}
        style={styles.tabs}
      >
        <View style={styles.titleContainer}>
          <Feather name={icon} size={24} color={Colors.light.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Feather name="chevron-right" size={24} color={Colors.light.icon} />
      </Pressable>
    </Link>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.45,
    borderBottomColor: "#C6A7A7",
    paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 18,
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
});
