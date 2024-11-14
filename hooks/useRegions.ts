// useBillboards.ts
import { Region } from "@/constants/Types";
import { getRegions } from "@/util/https";
import { useQuery } from "@tanstack/react-query";

export const useRegions = () => {
  return useQuery<Region[], Error>({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
};
