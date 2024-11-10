import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface BusinessSizeOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  iconName: string;
}

const BusinessSizeOption: React.FC<BusinessSizeOptionProps> = ({
  label,
  selected,
  onPress,
  iconName,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.optionContainer}>
      <Icon name={iconName} size={40} color={selected ? "green" : "black"} />
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  selectedLabel: {
    color: "green",
    fontWeight: "bold",
  },
});

export default BusinessSizeOption;
