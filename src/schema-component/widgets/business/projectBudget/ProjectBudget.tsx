import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import { useAPIClient } from "../../../../api-client";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import { useToken } from "@/style";
import { CountTo } from "@/schema-component/components";
import { FeeListItem, getPieOption } from "./getPieOption";
import { memo, useMemo } from "react";

export const ProjectBudget = memo(() => {
  const { token } = useToken();

  const apiClient = useAPIClient();

  const { data, isLoading } = useQuery({
    queryKey: ["/api/bg/v1/fee/budget"],
    queryFn: () =>
      apiClient.request({
        method: "get",
        url: "/api/bg/v1/fee/budget",
      }),
  });
  const amount = get(data, "data.data.totalBudget", "0");
  const feeList: FeeListItem[] = get(data, "data.data.feeList", []);
  const option = useMemo(() => {
    return getPieOption({
      feeList,
    });
  }, [feeList.length]);
  if (isLoading) {
    return null;
  }
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          width: 100%;
          height: 0.36rem;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          className={css`
            font-size: 0.16rem;
            color: ${token.textCommon};
            line-height: 0.16rem;
            opacity: 0.65;
            margin-right: 0.16rem;
          `}
        >
          在建项目总预算（万元）
        </div>
        <div
          className={css`
            font-family: Digiface;
            font-size: 0.36rem;
            color: ${token.textNumGreen};
          `}
        >
          <CountTo endVal={amount || 0} />
          {/* {amount} */}
        </div>
      </div>
      <div
        className={css`
          width: 100%;
          margin-top: 0.16rem;
          height: calc(100% - 0.52rem);
        `}
      >
        <ReactECharts
          style={{
            width: "100%",
            height: "100%",
          }}
          option={option}
        />
      </div>
    </div>
  );
});

ProjectBudget.displayName = "ProjectBudget";
