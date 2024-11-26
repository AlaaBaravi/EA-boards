import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LinearBackground from "@/components/ui/LinearBackground";
import Logo from "@/components/ui/Logo";
import { mainstyles } from "@/constants/Styles";
import WelcomeText from "@/components/ui/WelcomeText";
import { OtpInput } from "react-native-otp-entry";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/ui/CustomButton";
import { useAuth } from "@/store/authContext";
import { useConfirmToken } from "@/hooks/auth/useConfirmToken";

const ResetPassword = () => {
  const [code, setCode] = useState<string>();
  const { state } = useAuth();
  const { mutate: confirmTokenMutation, isPending } = useConfirmToken();

  const handleReset = () => {
    if (state.user?.email && code) {
      confirmTokenMutation({ email: state.user?.email, token: code });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearBackground>
        <Logo />
        <View>
          <WelcomeText text="Forget Password" />
          <Text style={styles.text}>Code has been sent to your email.</Text>
        </View>

        <Text style={styles.text}>Enter the code:</Text>

        <OtpInput
          numberOfDigits={4}
          onTextChange={(text) => setCode(text)}
          theme={{
            containerStyle: { width: "80%" },
            pinCodeContainerStyle: { borderColor: Colors.light.text },
            pinCodeTextStyle: { color: "white" },
            filledPinCodeContainerStyle: {
              backgroundColor: Colors.light.primary,
              borderColor: Colors.light.primary,
            },
          }}
        />

        <CustomButton title="done" onPress={handleReset} disabled={isPending} />
      </LinearBackground>
    </KeyboardAvoidingView>
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
