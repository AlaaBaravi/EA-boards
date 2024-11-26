import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="loginSignup" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="congrats"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
