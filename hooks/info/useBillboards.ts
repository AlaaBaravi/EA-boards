import { Billboard, GetBillboardsParams } from "@/constants/Types";
import { getBillboards } from "@/util/https";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useBillboards = (params?: GetBillboardsParams) => {
  const memoizedParams = useMemo(() => params, [params]);

  return useQuery<Billboard[], Error>({
    queryKey: ["billboards", memoizedParams],
    queryFn: () => getBillboards(memoizedParams || {}),
  });
};
