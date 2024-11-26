import { Slot } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { AuthProvider } from "@/store/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-get-random-values";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootSiblingParent>
          <Slot />
        </RootSiblingParent>
      </AuthProvider>
    </QueryClientProvider>
  );
}
