import { showToast } from "@/util/fn";
import { deleteBillboardById } from "@/util/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useDeleteBillboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      deleteBillboardById(id, token),

    onSuccess: () => {
      showToast("The billboard has been deleted successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["billboards"] });
      router.push("/(app)/(tabs)/billboards");
    },
    onError: () => {
      showToast("An error occurred while deleting the billboard.", "danger");
    },
  });
};
