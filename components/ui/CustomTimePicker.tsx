import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { showTime } from "@/util/fn";
import { mainstyles } from "@/constants/Styles";

interface CustomTimePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  timeFormat?: Intl.DateTimeFormatOptions;
}

const CustomTimePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select Time",
  style,
  textStyle,
  labelStyle,
}: CustomTimePickerProps<TFieldValues>) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View>
          {label && (
            <Text style={[mainstyles.caption, labelStyle]}>{label}</Text>
          )}
          <Pressable
            onPress={() => setPickerVisible(true)}
            style={[styles.input, style]}
          >
            {value ? (
              <Text style={[styles.text, textStyle]}>{showTime(value)}</Text>
            ) : (
              <Text>{placeholder}</Text>
            )}
          </Pressable>
          {pickerVisible && (
            <DateTimePicker
              value={value || new Date()}
              mode="time"
              display="default"
              onChange={(event, date) => {
                setPickerVisible(false);
                if (date) onChange(date);
              }}
            />
          )}
        </View>
      )}
    />
  );
};

export default CustomTimePicker;

const styles = StyleSheet.create({
  input: {
    ...mainstyles.input,
    padding: 12,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  placeholder: {
    color: "#888",
    fontSize: 16,
  },
});
