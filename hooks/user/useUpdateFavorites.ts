import { FavoriteData } from "@/constants/Types";
import { useAuth } from "@/store/authContext";
import { showToast } from "@/util/fn";
import { updateFavorite } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFavorites = () => {
  const queryClient = useQueryClient();
  const { state } = useAuth();

  return useMutation({
    mutationFn: (data: FavoriteData) => updateFavorite(data, state.token!),

    onSuccess: () => {
      showToast("Favorites updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while adding billboard to favorite";
      showToast(errorMessage, "danger");
      console.log(errorMessage);
    },
  });
};
