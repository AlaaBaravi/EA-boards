import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC } from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { BillboardFormData } from "@/constants/Schemas";

interface CustomInputFieldProps {
  control: Control<BillboardFormData>;
  errors: FieldErrors<BillboardFormData>;
  fieldName: keyof BillboardFormData;
  label: string;
  isNumeric?: boolean;
}

const CustomInputField: FC<CustomInputFieldProps> = ({
  control,
  errors,
  fieldName,
  label,
  isNumeric = false,
}) => {
  const error = errors[fieldName] as FieldError | undefined;

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={mainstyles.caption}>{label}</Text>
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(text) => {
                if (isNumeric) {
                  const parsedValue = text ? parseFloat(text) : 0;
                  onChange(parsedValue);
                } else {
                  onChange(text);
                }
              }}
              value={value !== undefined ? String(value) : ""}
              keyboardType={isNumeric ? "numeric" : "default"}
            />
          )}
        />
      </View>
      {error && (
        <Text style={{ color: Colors.light.danger }}>{error.message}</Text>
      )}
    </>
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.light.primary,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputContainer: {
    width: "100%",
    gap: 4,
  },
});
