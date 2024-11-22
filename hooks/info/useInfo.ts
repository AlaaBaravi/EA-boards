import { useQuery } from "@tanstack/react-query";
import { Info } from "@/constants/Types";
import { getInfo } from "@/util/https";

export const useInfo = () => {
  return useQuery<Info[], Error>({
    queryKey: ["info"],
    queryFn: getInfo,
  });
};
