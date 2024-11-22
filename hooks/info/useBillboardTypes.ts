// useBillboards.ts
import { BillboardType, Region } from "@/constants/Types";
import { getBillboardTypes, getRegions } from "@/util/https";
import { useQuery } from "@tanstack/react-query";

export const useBillboardTypes = () => {
  return useQuery<BillboardType[], Error>({
    queryKey: ["billboardTypes"],
    queryFn: getBillboardTypes,
  });
};
