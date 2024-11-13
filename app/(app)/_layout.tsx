import { ActivityIndicator, ActivityIndicatorBase, Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/store/authContext";
import { Colors } from "@/constants/Colors";

export default function AppLayout() {
  const { state, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.light.primary} />;
  }

  if (!state.isLoggedIn) {
    return <Redirect href="/auth/loginSignup" />;
  }

  return (
  <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{ contentStyle: { backgroundColor: "white" } }}
      />
    </Stack>
  );
}
