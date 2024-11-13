import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/store/authContext";
import Loading from "@/components/ui/Loading";

export default function AppLayout() {
  const { state, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
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
