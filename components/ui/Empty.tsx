import { StyleSheet, Text, View } from "react-native";
import { mainstyles } from "@/constants/Styles";
import { FC, ReactNode } from "react";

interface EmptyProps {
  text: string;
  children?: ReactNode;
}

const Empty: FC<EmptyProps> = ({ text, children }) => {
  return (
    <View style={mainstyles.empty}>
      <Text style={mainstyles.emptyText}>{text}</Text>
      {children}
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
