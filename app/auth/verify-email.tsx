import React, { useRef, useState } from "react";
import { Text, TextInput, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { OtpInput } from "react-native-otp-entry";

import { useAuth } from "@/store/authContext";
import { router } from "expo-router";
import LinearBackground from "@/components/ui/LinearBackground";
import Logo from "@/components/ui/Logo";
import { mainstyles } from "@/constants/Styles";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { showToast } from "@/util/fn";

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const { state } = useAuth();
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    if (!code) {
      Alert.alert("Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/auth/verify_email",
        {
          token: code,
          email: state.user?.email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setLoading(false);

      if (data.success) {
        showToast("Your email has been verified.", "success");
        router.push("/auth/congrats");
      } else {
        showToast(data.message || "Verification failed.", "danger");
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);

        showToast(
          error.response?.data.message ||
            "An error occurred during verification.",
          "danger"
        );
      } else {
        console.error("Error during email verification:", error);
        showToast("An unknown error occurred.", "danger");
      }
    }
  };

  const resendVerificationEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/auth/resend_verify_email",
        {
          email: state.user?.email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setLoading(false);
      if (data.success) {
        showToast("A new verification email has been sent.", "success");
      } else {
        showToast(data.message || "Failed to resend email.", "danger");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during resend:", error);
      showToast(
        "An error occurred while resending the verification email.",
        "danger"
      );
    }
  };

  return (
    <LinearBackground>
      <Logo />
      <Text style={mainstyles.title2}>Verify your Email</Text>
      <OtpInput
        numberOfDigits={4}
        onTextChange={(text) => setCode(text)}
        theme={{
          pinCodeContainerStyle: { borderColor: Colors.light.text },
          pinCodeTextStyle: { color: "white" },
          filledPinCodeContainerStyle: {
            backgroundColor: Colors.light.primary,
            borderColor: Colors.light.primary,
          },
        }}
      />

      <CustomButton title="Verify" onPress={verifyEmail} disabled={loading} />
      <CustomButton
        title="Resend Code"
        variant="secondary"
        onPress={resendVerificationEmail}
        disabled={loading}
      />
    </LinearBackground>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
