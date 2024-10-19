import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../ui/CustomButton";
import { mainstyles } from "@/constants/Styles";

interface TypeSelectionStepPrpos {
  nextStep: () => void;
  setUserType: (type: "customer" | "company") => void;
}

const TypeSelectionStep: FC<TypeSelectionStepPrpos> = ({
  nextStep,
  setUserType,
}) => {
  const selectType = (type: "customer" | "company") => {
    nextStep();
    setUserType(type);
  };

  return (
    <View style={styles.container}>
      <Text style={mainstyles.title2}>Join us as:</Text>
      <CustomButton title="Individual" onPress={() => selectType("customer")} />
      <CustomButton title="Company" onPress={() => selectType("company")} />
    </View>
  );
};

export default TypeSelectionStep;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 24,
  },
});
