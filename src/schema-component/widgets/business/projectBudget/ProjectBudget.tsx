import ReactECharts from "echarts-for-react";

import { get } from "lodash-es";
import { css } from "@emotion/css";

import type { FeeListItem } from "./getPieOption";

import { useProjectBudgetOption } from "./useProjectBudgetOption";

import { useToken } from "@/schema-component/antd/style";
import { useRequest } from "@/api-client";
import CountTo from "@/schema-component/components/CountTo";
import { EmptyKit } from "@/dashboard-themes/style-components";

export function ProjectBudget({ query }) {
  const { token } = useToken();

  const { data, isLoading } = useRequest(`/api/bg/v1/fee/budget`, {
    method: "GET",
  });
  const amount = get(data, "data.data.totalBudget", "0") || "0";
  const feeList: FeeListItem[] = get(data, "data.data.feeList", []) || [];
  const option = useProjectBudgetOption(feeList);
  // if (isLoading) {
  //   return null;
  // }
  return (
    <EmptyKit loading={isLoading}>
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
    </EmptyKit>
  );
}
