import { showToast } from "@/util/fn";
import { resendTokenEmail } from "@/util/https";
import { useMutation } from "@tanstack/react-query";

export const useResendTokenEmail = () => {
  return useMutation({
    mutationFn: (email: string) => resendTokenEmail(email),
    onSuccess: () => {
      showToast("Token sent successfully.", "success");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while sending token";
      showToast(errorMessage, "danger");
    },
  });
};
