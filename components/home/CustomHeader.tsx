import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

function CustomHeader({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Image source={require("@/assets/images/logo_mini.png")} />
      <View style={styles.titleContainer}>{children}</View>
      <MaterialIcons name="notifications-none" size={24} color="green" />
    </SafeAreaView>
  );
}

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
  },
});
