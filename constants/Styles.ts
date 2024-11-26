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
  title3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
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
    borderColor: Colors.light.primary,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: { width: 192, height: 103 },
  error: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: Colors.light.danger,
    marginTop: 5,
  },
  empty: {
    flex: 1,
    padding: 24,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
