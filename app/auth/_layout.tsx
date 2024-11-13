import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const _layout = () => {
    return (
        <Stack
            screenOptions={{
                headerTitle: "",
                headerLeft: () => (
                    <Feather
                        name="chevron-left"
                        size={32}
                        color={Colors.light.primary}
                        onPress={() => router.back()}
                    />
                ),
                headerTransparent: true
            }}
        >
            <Stack.Screen name="loginSignup" options={{ headerShown: false, headerTransparent: true }} />
            <Stack.Screen
                name="login"
            />
            <Stack.Screen
                name="signup"
            />
            <Stack.Screen
                name="forgotPassword"
            />
            <Stack.Screen
                name="verify-email"
            />
            <Stack.Screen
                name="resetPassword"
            />
        </Stack>
    );
};

export default _layout;

const styles = StyleSheet.create({});
