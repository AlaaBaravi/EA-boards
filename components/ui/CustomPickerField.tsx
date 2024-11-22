import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/constants/Colors";
import { mainstyles } from "@/constants/Styles";

interface CustomPickerFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  children: ReactNode;
  placeholder?: string;
  containerStyle?: object;
  pickerStyle?: object;
  errorStyle?: object;
}

const CustomPickerField = <T extends FieldValues>({
  control,
  error,
  name,
  label,
  children,
  placeholder = "Select an option",
  containerStyle,
  pickerStyle,
}: CustomPickerFieldProps<T>) => {
  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[mainstyles.caption, { textTransform: "capitalize" }]}>
          {label}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={[mainstyles.input, pickerStyle]}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              dropdownIconColor={Colors.light.primary}
            >
              {/* Placeholder option */}
              <Picker.Item
                label={placeholder}
                value=""
                enabled={false}
                style={{ color: Colors.light.icon }}
              />
              {children}
            </Picker>
          </View>
        )}
      />
      {error && <Text style={mainstyles.error}>{error.message}</Text>}
    </View>
  );
};

export default CustomPickerField;

const styles = StyleSheet.create({});
