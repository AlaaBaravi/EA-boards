import { BillboardFormData } from "@/constants/Schemas";
import { useAuth } from "@/store/authContext";
import { showToast } from "@/util/fn";
import { addBillboard } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useAddBillboard = (reset: () => void) => {
  const { state } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BillboardFormData) => addBillboard(data, state.token!),

    onSuccess: () => {
      showToast("Billboard added successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["billboards"] });
      reset();
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while adding billboard";
      showToast(errorMessage, "danger");
    },
  });
};
