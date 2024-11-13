import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import CustomButton from "./CustomButton";

const Error = ({ errorMessage }: { errorMessage?: string }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        {errorMessage || "An unexpected error occurred."}
      </Text>
      <CustomButton title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
});
