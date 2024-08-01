import { css } from "@emotion/css";
import React from "react";
import { ConfigProvider } from "antd";

import { ChartView } from "./ChartView";

import { useCustomThemeToken } from "@/dashboard-themes";
import { useApp } from "@/application/hooks";
import { ThemeCSSVariableProvider } from "@/dashboard-themes/css-variable";
import MonacoEditor from "@/schema-component/components/MonacoEditor";

function ChartEditRightMain({
  chartOptionEditorRef,
  chartOptionStr,
  setChartOptionStr,
  chartOption,
  themeProvider,
  isDarkTheme,
}) {
  const app = useApp();

  return (
    <div
      className={css`
        width: 450px;
        height: 100%;
      `}
    >
      <div
        className={css`
          width: 450px;
          height: 288px;
          border-bottom: 1px solid #dcdfe6;
        `}
      >
        {/* 预览 */}
        <ChartView
          option={chartOption}
          themeProvider={themeProvider}
          isDarkTheme={isDarkTheme}
        />
      </div>
      <div
        className={css`
          width: 100%;
          height: calc(100% - 288px);
        `}
      >
        {/*  出码 */}
        <MonacoEditor
          language="json"
          ref={chartOptionEditorRef}
          value={chartOptionStr}
          onChange={setChartOptionStr}
          height="100%"
        />
      </div>
    </div>
  );
}

export function ChartEditRight(props) {
  const { isDarkTheme, themeProvider } = props;
  const customThemeToken = useCustomThemeToken({
    isDarkTheme,
    themeProvider,
  });
  return (
    <ConfigProvider
      theme={{
        ...customThemeToken,
      }}
    >
      <ThemeCSSVariableProvider>
        <ChartEditRightMain {...props} />
      </ThemeCSSVariableProvider>
    </ConfigProvider>
  );
}
