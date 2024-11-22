import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
import { useResendTokenEmail } from "@/hooks/auth/useResendTokenEmail";
import { showToast } from "@/util/fn";

const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const { dispatch } = useAuth();

  const { mutate: resendTokenEmailMutation, isPending: isSending } =
    useResendTokenEmail();

  const handleForgotPassword = async () => {
    if (!email) {
      showToast("Please enter your email", "danger");
      return;
    }

    resendTokenEmailMutation(email);
    dispatch({ type: "UPDATE_USER", payload: { email: email } });
    router.push("/auth/resetPassword");
  };

  return (
    <LinearBackground>
      <Logo />
      <View>
        <WelcomeText text="Forget Password" />
        <Text style={styles.text}>Please enter your email.</Text>
      </View>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
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
            disabled={isSending}
          />
        </KeyboardAvoidingView>
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
