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
          headerTitle: "",
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={Colors.light.primary}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={Colors.light.primary}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={Colors.light.primary}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={Colors.light.primary}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={Colors.light.primary}
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
