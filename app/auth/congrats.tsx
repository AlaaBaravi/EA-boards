import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import LinearBackground from "@/components/ui/LinearBackground";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";

const congrats = () => {
  return (
    <LinearBackground>
      <Image source={require("@/assets/images/tdesign_secured.png")} />
      <Text style={mainstyles.title1}>Congratulation</Text>
      <Text style={[mainstyles.caption, { color: Colors.light.icon }]}>
        Your account has been successfully verified.
      </Text>
      <CustomButton title="Next" onPress={() => router.push("/auth/login")} />
    </LinearBackground>
  );
};

export default congrats;
