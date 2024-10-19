import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainstyles } from "@/constants/Styles";

const Logo = () => {
  return (
    <Image
      source={require("@/assets/images/logo.png")}
      style={mainstyles.logo}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({});
