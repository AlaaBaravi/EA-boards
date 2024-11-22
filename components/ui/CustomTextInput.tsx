import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import {
  Controller,
  Control,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/Ionicons"; // Ensure you install and link this library

interface CustomTextInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: string;
  secureTextEntry?: boolean; // Add this to handle password inputs
}

const CustomTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  containerStyle = {},
  icon,
  secureTextEntry,
  ...textInputProps
}: CustomTextInputProps<T>) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[mainstyles.caption, { textTransform: "capitalize" }]}>
          {label}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[error ? styles.inputError : null, styles.textInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? String(value) : ""}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              {...textInputProps}
            />
          )}
        />
        {icon && (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={togglePasswordVisibility}
          >
            <Icon
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color={Colors.light.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={mainstyles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    ...mainstyles.input,
    flex: 1,
    paddingRight: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputError: {
    borderColor: Colors.light.danger,
  },
});

export default CustomTextInput;
