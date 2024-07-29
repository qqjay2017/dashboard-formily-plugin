import { css } from "@emotion/css";

import ReactECharts from "echarts-for-react";

import { ErrorBoundary } from "react-error-boundary";
import chartDarkTheme from "@/themes/global-theme/chart-theme/dark";
import chartLightTheme from "@/themes/global-theme/chart-theme/light";

import { useDashboardRootStyle } from "@/schema-component/components/DashboardRoot/styles";
import { cn, cx } from "@/utils";
import { useClassicFrameStyle } from "@/schema-component/widgets/frame/classic-frame/styles";
import { AppError } from "@/application/components/defaultAppError";
import { useApp } from "@/application";

interface IChartViewCoreProps {
  option?: any;
  themeProvider?: string;
  isDarkTheme?: boolean;
}
function ChartViewCore({
  option = {},
  isDarkTheme,
  themeProvider,
}: IChartViewCoreProps) {
  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
  });
  const classicFrameStyle = useClassicFrameStyle({ hasTitle: false });
  return (
    <div
      id="ChartViewCore"
      className={cx(
        rootStyle.styles,
        css`
          width: 100%;
          height: 100%;
          background-position: center center;
        `,
        themeProvider
      )}
    >
      <div className={cn("nodeContentRenderer", classicFrameStyle.styles)}>
        <ReactECharts
          theme={isDarkTheme ? chartDarkTheme : chartLightTheme}
          style={{
            width: "100%",
            height: "100%",
          }}
          option={option || {}}
        />
      </div>
    </div>
  );
}

export function ChartView(props: IChartViewCoreProps) {
  const app = useApp();
  return (
    <ErrorBoundary
      FallbackComponent={(props) => <AppError app={app} {...props} />}
    >
      <ChartViewCore {...props} />
    </ErrorBoundary>
  );
}
