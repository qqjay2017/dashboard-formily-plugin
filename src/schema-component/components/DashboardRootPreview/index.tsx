import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { ConfigProvider } from "antd";
import { RecursionField, useFieldSchema } from "@formily/react";
import { css } from "@emotion/css";

import { useBreakpoints, useRowProperties } from "../../hooks/hooks";
import { DashboardRootContext, DesignPageConext } from "../context";
import { defaultBreakpoints, flexible } from "@/utils/utils";

import { fontStyle } from "@/dashboard-themes/global-theme/font-style";
import { useCustomThemeToken } from "@/dashboard-themes";

import { cn, cx, sizeFormat } from "@/utils";
import { ThemeCSSVariableProvider } from "@/dashboard-themes/css-variable";
import {
  useDashboardRootStyle,
  useScrollBarStyle,
} from "@/schema-component/hooks";
import type { DashboardRootProps } from "@/schema-component/types";

function DashboardRootPreview({ children, ...props }: DashboardRootProps) {
  const {
    breakpoints = defaultBreakpoints,
    designWidth = 1920,
    designHeight = 1080,

    distributed,
    className,
    style,
    isDarkTheme,
    ...otherProps
  } = props;
  const { breakpoint, rowHeight, colWidth, width, isPc, themeProvider } =
    useContext(DashboardRootContext);

  const [designZoom, setDesignZoom] = useState(1);

  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
  });
  const customThemeToken = useCustomThemeToken({
    themeProvider,
    isDarkTheme,
  });

  const blockItems = useRowProperties({
    rowHeight,
    colWidth,
    breakpoint,
    width,
    isPc,
  });

  const RenderBlockItems = useMemo(() => {
    return (
      <>
        {blockItems.map((schema, index) => {
          return (
            <Fragment key={`${schema.name}${index}`}>
              <RecursionField name={schema.name} schema={schema} />
            </Fragment>
          );
        })}
      </>
    );
  }, [blockItems?.length, breakpoint]);

  useEffect(() => {
    if (isPc) {
      flexible(designWidth);
    } else if (breakpoint === "mobile") {
      flexible(550);
    } else if (breakpoint === "tablet") {
      flexible(1300);
    }
  }, [designWidth, isPc, breakpoint]);

  const lastBlockItem =
    blockItems[blockItems.length - 1]?.["x-decorator-props"];
  const totalHeight = lastBlockItem
    ? (lastBlockItem.y + lastBlockItem.h + 0.5) * rowHeight
    : "2000";
  const dheight = isPc || !lastBlockItem ? "100%" : `${totalHeight}px`;

  if (!breakpoint) {
    return null;
  }

  return (
    <DesignPageConext.Provider
      value={{
        designZoom,
        setDesignZoom,
      }}
    >
      <ConfigProvider
        theme={{
          ...customThemeToken,
        }}
      >
        <ThemeCSSVariableProvider>
          <div
            // {...otherProps}
            id="DashboardRoot"
            className={cn(
              fontStyle,
              css`
                background-size: cover;
                background-position: center;
                background-repeat: ${isPc ? "no-repeat" : "repeat"};
                font-size: 0.14rem;
                line-height: 1;
                color: #ccc;
                width: 100%;
                height: ${dheight};
                position: relative;
                /* min-height: 100vh; */
              `,
              rootStyle.styles,
              className,
              themeProvider
            )}
            style={{
              ...style,
            }}
          >
            {width ? RenderBlockItems : null}
          </div>
        </ThemeCSSVariableProvider>
      </ConfigProvider>
    </DesignPageConext.Provider>
  );
}

export default DashboardRootPreview;
