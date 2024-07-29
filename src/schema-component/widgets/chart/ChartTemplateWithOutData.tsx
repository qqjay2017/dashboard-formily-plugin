import ReactECharts from "echarts-for-react";
import { get } from "lodash-es";
import { EmptyKit } from "@/themes/style-components";
import { useToken } from "@/schema-component/antd/style";
import { useChartOption, useFetchChartConfig } from "@/schema-component";
import chartDarkTheme from "@/themes/global-theme/chart-theme/dark";
import chartLightTheme from "@/themes/global-theme/chart-theme/light";
import type { SchemComponentWithDataSourceProps } from "@/types";

interface ChartTemplateWithOutDataProps
  extends SchemComponentWithDataSourceProps {
  chartId?: string;
  loading?: boolean;
  empty?: boolean;
  busData?: any;
}

export function ChartTemplateWithOutData(props: ChartTemplateWithOutDataProps) {
  const {
    chartId,
    loading,
    empty,

    busData = {},
  } = props;

  const { token } = useToken();
  const { data: chartDataRes, isLoading: isChartDataLoading } =
    useFetchChartConfig(chartId);
  const chartDataTemplate = get(chartDataRes, "data.data.template");

  const optionMemo = useChartOption(chartDataTemplate, busData);

  return (
    <EmptyKit
      loading={isChartDataLoading || loading}
      empty={!chartDataTemplate || empty}
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
