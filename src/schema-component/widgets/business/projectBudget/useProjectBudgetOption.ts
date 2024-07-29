import { useMemo } from "react";
import type { FeeListItem } from "./getPieOption";
import { getPieOption } from "./getPieOption";
import { useToken } from "@/schema-component/antd/style";

export function useProjectBudgetOption(feeList: FeeListItem[]) {
  const { token } = useToken();

  return useMemo(() => {
    return getPieOption({
      feeList,
      chartColors: token.chartColors,
    });
  }, [feeList.length]);
}
