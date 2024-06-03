import React, { HTMLAttributes, PropsWithChildren, useMemo } from "react";

import { defaultBreakpoints, sizeFormat } from "./utils";
import { useSchemaComponentContext } from "../../hooks";
import { useFieldSchema } from "@formily/react";

import { useUpdate } from "ahooks";
import { useBreakpoints } from "./hooks";
import { allThemeNameMap } from "../../../dashboard-themes";
import { useDashboardRootStyle } from "./styles";

import { DashboardRootContext } from "./context";
import { cn } from "../../../utils";

import { useSaveAllFieldSchema } from "../../hooks/useSaveAllFieldSchema";
import { ConfigProvider } from "antd";
import { ThemeCSSVariableProvider } from "../../../css-variable";

import { MoveableManage } from "./MoveableManage";

interface DashboardRootProps extends PropsWithChildren, HTMLAttributes<any> {
  cols?: number;
  designable?: boolean;
  distributed?: boolean;
  designWidth?: number;
  designHeight?: number;
  breakpoints?: {
    showroom: number;
    desktop: number;
    tablet: number;
    mobile: number;
  };
  themeProvider?: string;
  rows?: 12;
  rowheight?: 80;
  dndContext?: any;
  className?: string;
  style?: React.CSSProperties;
  isDarkTheme?: boolean;
}

export const DashboardRoot = ({ children, ...props }: DashboardRootProps) => {
  const {
    breakpoints = defaultBreakpoints,
    designWidth = 1920,
    designHeight = 1080,
    cols = 12,
    rows = 12,
    rowheight: mobileRowHeight = 80,
    themeProvider = "",
    distributed,
    className,
    style,
    isDarkTheme,
    ...otherProps
  } = props;

  const { designable } = useSchemaComponentContext();

  const { breakpoint, width, height, ref } = useBreakpoints(breakpoints, 800);

  const isPc = breakpoint === "desktop" || breakpoint === "showroom";

  const rowHeight = sizeFormat(height / rows);

  const colWidth = cols && width ? sizeFormat(width / cols) : 0;

  const scale = useMemo(() => {
    let scale = 1;
    if (!width || !height) {
      return scale;
    }

    if (width / height < designWidth / designHeight) {
      scale = width / designWidth;
    } else {
      scale = height / designHeight;
    }
    if (scale < 0.2) {
      return 0.2;
    }
    if (scale > 1.2) {
      return 1.2;
    }
    return scale;
  }, [designWidth, designHeight, width, height]);

  const themeConfig = allThemeNameMap[themeProvider] || {};
  const themeToken = themeConfig?.token || {};
  const themeDarkOrLightToken = themeConfig?.[isDarkTheme ? "dark" : "light"];

  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
  });

  const fieldSchema = useFieldSchema();

  return (
    <ConfigProvider
      theme={{
        token: {
          ...themeToken,
          ...themeDarkOrLightToken,
        },
      }}
    >
      <ThemeCSSVariableProvider>
        <DashboardRootContext.Provider
          value={{
            breakpoint,
            colWidth,
            rowHeight,
            isPc,
            designWidth,
            designHeight,
            themeProvider,
            scale,
            rootFieldSchema: fieldSchema,
            mobileRowHeight,
          }}
        >
          <div
            {...otherProps}
            id="DashboardRoot"
            ref={ref}
            className={cn(rootStyle.styles, className, themeProvider)}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              ...style,
            }}
          >
            {designable && <MoveableManage />}

            {children}
          </div>
        </DashboardRootContext.Provider>
      </ThemeCSSVariableProvider>
    </ConfigProvider>
  );
};
