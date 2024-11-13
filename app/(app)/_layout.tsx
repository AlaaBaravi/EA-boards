import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/store/authContext";
import Loading from "@/components/ui/Loading";

const queryClient = new QueryClient();

export default function AppLayout() {
  const { state, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!state.isLoggedIn) {
    return <Redirect href="/auth/loginSignup" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{ contentStyle: { backgroundColor: "white" } }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
