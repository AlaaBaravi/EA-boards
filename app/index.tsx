import React from "react";

import LinearBackground from "@/components/ui/LinearBackground";
import { StyleSheet, Text } from "react-native";
import WelcomeText from "@/components/ui/WelcomeText";
import Logo from "@/components/ui/Logo";
import WelcomeImage from "@/components/ui/WelcomeImage";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <LinearBackground>
      <Logo />
      <WelcomeText />
      <WelcomeImage />
      <Text style={styles.description}>
        Upload your ad to our billboards around your country, located in the
        most crowded areas, for maximun reach!
      </Text>
      <CustomButton
        title="Lets Go"
        onPress={() => router.push("/auth/loginSignup")}
      />
    </LinearBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
    marginTop: 64,
  },
});
