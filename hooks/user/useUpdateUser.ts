import { ProfileFormData } from "@/constants/Schemas";
import { useAuth } from "@/store/authContext";
import { showToast } from "@/util/fn";
import { updateUserProfile } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { router } from "expo-router";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { state } = useAuth();

  return useMutation({
    mutationFn: (data: ProfileFormData) =>
      updateUserProfile(data, state.token!),

    onSuccess: (updatedData) => {
      console.log(updatedData);
      queryClient.setQueryData(["userData"], (oldData: any) => ({
        ...updatedData, // Merge updated data into the existing data
      }));
      showToast("User updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      router.replace("/(app)/(tabs)/profile");
    },

    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while updating user";
      showToast(errorMessage, "danger");
      console.log(errorMessage);
    },
  });
};
