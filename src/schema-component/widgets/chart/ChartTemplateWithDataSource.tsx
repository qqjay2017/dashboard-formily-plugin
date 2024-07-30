import ReactECharts from "echarts-for-react";

import { get } from "lodash-es";

import type { ChartTemplateProps } from "./types";
import { useFetchChartConfig } from "./hooks/useFetchChartConfig";
import { useChartOption } from "./hooks";
import { EmptyKit } from "@/themes/style-components";

import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import { useToken } from "@/schema-component/antd/style";
import chartDarkTheme from "@/themes/global-theme/chart-theme/dark";
import chartLightTheme from "@/themes/global-theme/chart-theme/light";

export function ChartTemplateWithDataSource({
  chartId,
  apiInfo,
  query,
}: ChartTemplateProps) {
  const { token } = useToken();
  const { data: chartDataRes, isLoading: isChartDataLoading } =
    useFetchChartConfig(chartId);
  const chartDataTemplate = get(chartDataRes, "data.data.template");
  const queryParams = useQueryToBusParams(query);
  const { data: busDataRes, isLoading: isBusDataLoading } = useDataBindFetch(
    apiInfo,
    queryParams
  );
  const busData = get(busDataRes, "data.data");

  const optionMemo = useChartOption(chartDataTemplate, busData);

  return (
    <EmptyKit
      loading={isChartDataLoading || isBusDataLoading}
      empty={!chartDataTemplate || !busData}
    >
      <ReactECharts
        theme={token.isDarkTheme ? chartDarkTheme : chartLightTheme}
        style={{
          width: "100%",
          height: "100%",
        }}
        option={optionMemo || {}}
      />
    </EmptyKit>
  );
}
