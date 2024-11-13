import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Control, Controller, FieldError, FieldErrors, FieldPath } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { ZodType } from "zod";

interface CustomGenericPickerProps<T extends ZodType<any, any>> {
    control: Control<T["_output"]>;
    errors: FieldErrors<T["_output"]>;
    fieldName: FieldPath<T["_output"]>;
    label: string;
    children: ReactNode;
}

const CustomGenericPicker = <T extends ZodType<any, any>>({
    control,
    errors,
    fieldName,
    label,
    children,
}: CustomGenericPickerProps<T>) => {
    const error = errors[fieldName] as FieldError | undefined;

    return (
        <>
            <View style={styles.inputContainer}>
                <Text style={mainstyles.caption}>{label}</Text>
                <Controller
                    name={fieldName as any} // Type assertion due to React Hook Form type constraints
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

export default CustomGenericPicker;

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

