import { Billboard } from "@/constants/Types";
import { getBillboardById } from "@/util/https";
import { useQuery } from "@tanstack/react-query";

export const useBillboardById = (id: string, token: string) => {
  return useQuery<Billboard, Error>({
    queryKey: ["billboard", id, token],
    queryFn: () => getBillboardById(id, token),
    enabled: !!id && !!token,
  });
};
