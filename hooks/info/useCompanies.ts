import { useQuery } from "@tanstack/react-query";
import { Company } from "@/constants/Types";
import { getCompanies } from "@/util/https";

export const useCompanies = () => {
  return useQuery<Company[], Error>({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};
