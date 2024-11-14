// useBillboards.ts
import { Billboard, GetBillboardsParams } from "@/constants/Types";
import { getBillboards } from "@/util/https";
import { useQuery } from "@tanstack/react-query";

export const useBillboards = (params?: GetBillboardsParams) => {
  return useQuery<Billboard[], Error>({
    queryKey: ["billboards", params],
    queryFn: () => getBillboards(params),
  });
};
