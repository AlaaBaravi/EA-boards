import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/store/authContext";
import Loading from "@/components/ui/Loading";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {
  const { state, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!state.isLoggedIn) {
    return <Redirect href="/auth/loginSignup" />;
  }

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(billboards)/add-billboard"
        options={{
          headerTitle: "Add Billboard",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(billboards)/edit-billboard"
        options={{
          headerTitle: "Edit Billboard",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(billboards)/[id]"
        options={{
          headerTitle: "Billboard Information",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(booking)/filter-billboards"
        options={{
          headerTitle: "Billboards Filtering",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(booking)/filtered-billboards"
        options={{
          headerTitle: "Filtered Billboards",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(profile)/favorites"
        options={{
          headerTitle: "Favorites",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <MaterialIcons name="notifications-none" size={24} color="green" />
          ),
        }}
      />
      <Stack.Screen
        name="(profile)/appSettings"
        options={{
          headerTitle: "App Settings",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <MaterialIcons name="notifications-none" size={24} color="green" />
          ),
        }}
      />
      <Stack.Screen
        name="(profile)/accountInfo"
        options={{
          headerTitle: "Account info and settings",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <MaterialIcons name="notifications-none" size={24} color="green" />
          ),
        }}
      />
      <Stack.Screen
        name="(profile)/about"
        options={{
          headerTitle: "About And Feedback",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <MaterialIcons name="notifications-none" size={24} color="green" />
          ),
        }}
      />
    </Stack>
  );
}
