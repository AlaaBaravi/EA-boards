import { FeedbackFormInputs } from "@/constants/Schemas";
import { showToast } from "@/util/fn";
import { sendFeedback } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendFeedback = (reset: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackFormInputs) => sendFeedback(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["info"] });
      reset();
      showToast("Feedback sent successfully.", "success");
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while adding billboard";
      showToast(errorMessage, "danger");
      console.error(error.response.data.message);
    },
  });
};
