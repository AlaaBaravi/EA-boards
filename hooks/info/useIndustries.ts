import { Industry } from "@/constants/Types";
import { getIndustries } from "@/util/https";
import { useQuery } from "@tanstack/react-query";

export const useIndustries = () => {
  return useQuery<Industry[], Error>({
    queryKey: ["industries"],
    queryFn: getIndustries,
  });
};
