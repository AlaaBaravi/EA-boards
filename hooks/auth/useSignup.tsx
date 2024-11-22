import { FormValues } from "@/constants/Schemas";
import { useAuth } from "@/store/authContext";
import { showToast } from "@/util/fn";
import { resetPassword, signup } from "@/util/https";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useSignup = () => {
  const { dispatch } = useAuth();

  return useMutation({
    mutationFn: (data: FormValues) => signup(data),

    onSuccess: (data) => {
      console.log(data);
      dispatch({
        type: "LOGIN",
        payload: {
          token: data.token,
          user: {
            email: data.email,
            accountType: data.type,
          },
        },
      });
      router.push({
        pathname: "/auth/verify-email",
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "An error occurred while signing up";
      showToast(errorMessage, "danger");
      console.log(errorMessage);
    },
  });
};
