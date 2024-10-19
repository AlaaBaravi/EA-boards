import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";

interface PrimaryButtonProps {
  title: string;
  variant?: "primary" | "secondary";
  onPress: (event: GestureResponderEvent) => void;
}

const CustomButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = "primary",
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        variant === "secondary" ? styles.secondary : styles.primary,
      ]}
      onPress={onPress}
    >
      <Text
        style={
          variant === "secondary" ? styles.textSecondary : styles.textPrimary
        }
      >
        {title}
      </Text>
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
    marginTop: 24,
  },
  primary: {
    backgroundColor: Colors.light.secondary,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  textPrimary: {
    color: "#FFE2E2",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  textSecondary: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
