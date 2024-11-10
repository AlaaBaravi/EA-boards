import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { router } from "expo-router";

import LinearBackground from "@/components/ui/LinearBackground";
import WelcomeText from "@/components/ui/WelcomeText";
import RegisterLink from "@/components/ui/RegisterLink";
import CustomButton from "@/components/ui/CustomButton";
import Logo from "@/components/ui/Logo";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { resendTokenEmail } from "@/util/https";
import { useAuth } from "@/store/authContext";

const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      // setIsLoading(true);
      // const response = await resendTokenEmail(email);
      // console.log(response);

      // dispatch({ type: "UPDATE_USER", payload: { email: email } });
      router.push("/auth/resetPassword");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data.message || "Failed to send reset email"
        );
      } else {
        console.error("Unknown Error:", error);
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearBackground>
      <Logo />
      <View>
        <WelcomeText text="Forget Password" />
        <Text style={styles.text}>Please enter your email.</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomButton
          title="Next"
          onPress={handleForgotPassword}
          disabled={isLoading}
        />
      </View>
      <RegisterLink />
    </LinearBackground>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: Colors.light.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  text: {
    ...mainstyles.caption,
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: 12,
  },
});
