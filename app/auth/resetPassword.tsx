import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import LinearBackground from "@/components/ui/LinearBackground";
import Logo from "@/components/ui/Logo";
import { mainstyles } from "@/constants/Styles";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import WelcomeText from "@/components/ui/WelcomeText";

const ResetPassword = () => {
  const handleOtpComplete = (otp: string) => {
    Alert.alert("OTP Entered", otp);
    // Add OTP verification logic here
  };

  return (
    <LinearBackground>
      <Logo />
      <View>
        <WelcomeText text="Forget Password" />
        <Text style={styles.text}>Code has been sent to your email.</Text>
      </View>

      <Text style={styles.text}>Enter the code:</Text>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <OTPInputView
          style={{ width: "80%", height: 200 }}
          pinCount={4}
          codeInputFieldStyle={{
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 5,
          }}
          codeInputHighlightStyle={{ borderColor: "#03DAC6" }}
          onCodeFilled={(otp) => handleOtpComplete(otp)}
        />
      </View>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  text: {
    ...mainstyles.caption,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default ResetPassword;
