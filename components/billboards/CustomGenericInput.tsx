import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Control, Controller, FieldError, FieldErrors, FieldPath } from "react-hook-form";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { ZodType } from "zod";

interface CustomGenericInputProps<T extends ZodType<any, any>> {
    control: Control<T["_output"]>;
    errors: FieldErrors<T["_output"]>;
    fieldName: FieldPath<T["_output"]>;
    label: string;
    isNumeric?: boolean;
}

const CustomGenericInput = <T extends ZodType<any, any>>({
    control,
    errors,
    fieldName,
    label,
    isNumeric = false,
}: CustomGenericInputProps<T>) => {
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

export default CustomGenericInput;

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
