import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface PrimaryButtonProps {
  title: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle; // For the Pressable
  textStyle?: TextStyle; // For the Text
}

const CustomButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  icon,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
}) => {
  return (
    <Pressable
      android_ripple={{ color: "#28fd6c" }}
      style={[
        styles.button,
        variant === "secondary" ? styles.secondary : styles.primary,
        style, // Merge custom styles
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          variant === "secondary" ? styles.textSecondary : styles.textPrimary,
          textStyle, // Merge custom text styles
        ]}
      >
        {title}
      </Text>
      {icon && <Ionicons name={icon} size={24} color="#FFE2E2" />}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  primary: {
    backgroundColor: Colors.light.primary,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  textPrimary: {
    color: "#FFE2E2",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    textTransform: "capitalize",
  },
  textSecondary: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
