import { showToast } from "@/util/fn";
import { resetPassword } from "@/util/https";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      email,
      token,
      new_password,
    }: {
      email: string;
      token: string;
      new_password: string;
    }) => resetPassword({ email, token, new_password }),

    onSuccess: () => {
      showToast("Password resetted successfully.", "success");
      router.push("/auth/login");
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while resetting password";
      showToast(errorMessage, "danger");
    },
  });
};
