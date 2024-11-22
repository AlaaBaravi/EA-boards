import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import useAuthActions from "@/store/authActions";

const Logout = () => {
  const { logout } = useAuthActions();

  return (
    <Pressable style={styles.titleContainer} onPress={logout}>
      <MaterialIcons name="logout" size={24} color={Colors.light.danger} />
      <Text style={styles.logout}>Log out</Text>
    </Pressable>
  );
};

export default Logout;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 18,
  },
  logout: {
    color: Colors.light.danger,
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
  },
});
