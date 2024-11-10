import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const mainstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  title1: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    textTransform: "capitalize",
  },
  title2: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  captionSemiBold: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
  },
  input: {
    height: 40,
    borderColor: Colors.light.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },

  logo: { width: 192, height: 103 },
});
