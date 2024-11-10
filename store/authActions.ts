// store/authActions.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAction, UserProfile } from "@/constants/Types";
import { useAuth } from "./authContext"; // Importing useAuth from authContext
import { router } from "expo-router";
import { Alert } from "react-native";

const useAuthActions = () => {
  const { dispatch } = useAuth();

  const login = async (token: string, user: UserProfile) => {
    try {
      // Save token to AsyncStorage
      await AsyncStorage.setItem("userToken", token);

      // Retrieve token to confirm it was saved successfully
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        dispatch({ type: "LOGIN", payload: { token, user } });
        router.push("/(app)/(tabs)");
      } else {
        console.log("Token was not saved");
      }
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const logout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Logout Cancelled"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("userToken");
          dispatch({ type: "LOGOUT" });
        },
      },
    ]);
  };

  return { login, logout };
};

export default useAuthActions;
