import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/store/authContext";
import { router } from "expo-router";

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState<string>(""); // State for verification code input
  const { state } = useAuth(); // Get email from context
  const [loading, setLoading] = useState(false); // For showing loading state

  // Function to verify email with the entered code
  console.log(state.user.email, state.token);
  const verifyEmail = async () => {
    if (!code) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/auth/verify_email",
        {
          token: state.token,
          email: state.user.email,
          code,
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
        Alert.alert("Success", "Your email has been verified.");
        router.push("/(tabs)");
      } else {
        Alert.alert("Error", data.message || "Verification failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during email verification:", error);
      Alert.alert("Error", "An error occurred during verification.");
    }
  };

  // Function to resend verification email
  const resendVerificationEmail = async () => {
    if (!state.user.email) {
      Alert.alert("Error", "Email is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/auth/resend_verify_email",
        {
          email: state.user.email,
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
        Alert.alert("Success", "A new verification email has been sent.");
      } else {
        Alert.alert("Error", data.message || "Failed to resend email.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during resend:", error);
      Alert.alert(
        "Error",
        "An error occurred while resending the verification email."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
        maxLength={6} // Assuming the code is 6 digits
      />
      <Button title="Verify" onPress={verifyEmail} disabled={loading} />

      <View style={styles.resendContainer}>
        <Text>Didn't receive the code?</Text>
        <Button
          title="Resend Code"
          onPress={resendVerificationEmail}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  resendContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default VerifyEmail;
