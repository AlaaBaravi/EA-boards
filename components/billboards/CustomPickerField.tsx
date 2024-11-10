import { StyleSheet, Text, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { BillboardFormData } from "@/constants/Schemas";

interface CustomPickerFieldProps {
  control: Control<BillboardFormData>;
  errors: FieldErrors<BillboardFormData>;
  fieldName: keyof BillboardFormData;
  label: string;
  children: ReactNode;
}

const CustomPickerField: FC<CustomPickerFieldProps> = ({
  control,
  errors,
  fieldName,
  label,
  children,
}) => {
  const error = errors[fieldName] as FieldError | undefined;

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={mainstyles.caption}>{label}</Text>
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                dropdownIconColor={Colors.light.primary}
              >
                {children}
              </Picker>
            </View>
          )}
        />
      </View>
      {error && (
        <Text style={{ color: Colors.light.danger }}>{error.message}</Text>
      )}
    </>
  );
};

export default CustomPickerField;

const styles = StyleSheet.create({
  pickerContainer: {
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    gap: 4,
  },
});
