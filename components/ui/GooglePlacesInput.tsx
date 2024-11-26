import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Controller,
  Control,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Ionicons";

import { Colors } from "@/constants/Colors";

import { GOOGLE_MAPS_API_KEY } from "@env";

interface GooglePlacesInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  placeholder?: string;
  icon?: string;
}

const GooglePlacesInput = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  placeholder = "Enter location",
  icon = "location-outline",
}: GooglePlacesInputProps<T>) => {
  console.log(GOOGLE_MAPS_API_KEY);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <GooglePlacesAutocomplete
              query={{
                key: "YOUR_API_KEY",
                language: "en",
              }}
              placeholder={placeholder}
              onPress={(data, details = null) => {
                onChange(data.description); // Save the location name
              }}
              fetchDetails={true}
              textInputProps={{
                value: value ? String(value) : "",
                onChangeText: onChange,
                placeholder,
                style: [styles.textInput, error ? styles.inputError : null],
              }}
            />
          )}
        />
        {icon && (
          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name={icon} size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: Colors.light.primary,
    marginBottom: 5,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 5,
    padding: 10,
    paddingRight: 40,
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
  error: {
    color: Colors.light.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
