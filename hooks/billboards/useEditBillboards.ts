import { EditBillboardFormData } from "@/constants/Schemas";
import { useAuth } from "@/store/authContext";
import { showToast } from "@/util/fn";
import { editBillboard } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useEditBillboards = () => {
  const { state } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditBillboardFormData) =>
      editBillboard(data, state.token!),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["billboard"] });
      router.push(`/(app)/(tabs)/billboards/${variables.billboard_id}`);
      showToast("Billboard Edited Successfully", "success");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while editing billboard";

      showToast(errorMessage, "danger");
    },
  });
};
