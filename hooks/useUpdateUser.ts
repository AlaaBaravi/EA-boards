import { ProfileFormData } from "@/constants/Schemas";
import { useAuth } from "@/store/authContext";
import { showToast } from "@/util/fn";
import { updateUserProfile } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { state } = useAuth();

  return useMutation({
    mutationFn: (data: ProfileFormData) =>
      updateUserProfile(data, state.token!),

    onSuccess: () => {
      showToast("User updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while updating user";
      showToast(errorMessage, "danger");
    },
  });
};
