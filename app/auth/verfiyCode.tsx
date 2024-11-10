import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const verfiyCode = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Retrieve the email from params

  const handleVerifyToken = () => {
    if (!token) {
      Alert.alert("Error", "Please enter the code");
      return;
    }

    // Assuming token verification passes, navigate to ResetPasswordScreen with the token and email
    router.push({ pathname: "/auth/verfiyCode", params: { token, email } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the code sent to {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your code"
        value={token}
        onChangeText={setToken}
      />
      <Button title="Next" onPress={handleVerifyToken} />
    </View>
  );
};

export default verfiyCode;

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
});
