import { showToast } from "@/util/fn";
import { confirmToken } from "@/util/https";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useConfirmToken = () => {
  return useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      confirmToken({ email, token }),

    onSuccess: (data, variables) => {
      showToast("Token confirmed successfully.", "success");
      router.push({
        pathname: "/auth/changePassword",
        params: { email: variables.email, token: variables.token },
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while confirming token";
      showToast(errorMessage, "danger");
    },
  });
};
