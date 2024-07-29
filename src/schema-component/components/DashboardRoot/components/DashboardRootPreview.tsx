import { Fragment, useEffect, useMemo, useState } from "react";
import { ConfigProvider } from "antd";
import { RecursionField, useFieldSchema } from "@formily/react";
import { css } from "@emotion/css";
import { DashboardRootContext, DesignPageConext } from "../context";
import { defaultBreakpoints, flexible } from "../../../../utils/utils";
import { useBreakpoints, useRowProperties } from "../hooks";
import { useDashboardRootStyle, useScrollBarStyle } from "../styles";
import type { DashboardRootProps } from "../types";

import { fontStyle } from "@/themes/global-theme/font-style";
import { useCustomThemeToken } from "@/dashboard-themes";

import { cn, cx, sizeFormat } from "@/utils";
import { ThemeCSSVariableProvider } from "@/themes/css-variable";

export function DashboardRootPreview({
  children,
  ...props
}: DashboardRootProps) {
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

  const [designZoom, setDesignZoom] = useState(1);
  const { breakpoint, width, height } = useBreakpoints(
    breakpoints,
    300,
    document.body
  );
  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
  });

  const fieldSchema = useFieldSchema();
  const isPc = breakpoint === "desktop" || breakpoint === "showroom";
  const rowHeight = isPc ? sizeFormat(height / rows) : 80;
  const colWidth = cols && width ? sizeFormat(width / cols) : 0;
  const blockItems = useRowProperties({
    isPc,
    rowHeight,
    colWidth,
    breakpoint,
    width,
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
  }, [blockItems?.length]);
  const customThemeToken = useCustomThemeToken({
    themeProvider,
    isDarkTheme,
  });

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

  const { styles: scrollBarStyle } = useScrollBarStyle({
    thumbColor: customThemeToken.token.thumbColor,
  });

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
          <DashboardRootContext.Provider
            value={{
              breakpoint,
              colWidth,
              rowHeight,
              isPc,
              designWidth,
              designHeight,
              themeProvider,
              scale: designZoom,
              rootFieldSchema: fieldSchema,
              mobileRowHeight,
            }}
          >
            <div
              className={cn(css`
                width: 100vw;
                height: 100vh;
              `)}
            >
              {/* 移动端滚动容器 */}
              <div
                className={cx(
                  css`
                    width: 100vw;
                    height: 100vh;
                    position: relative;
                    background-size: cover;
                    overflow-x: hidden;
                    overflow-y: ${isPc ? "hidden" : "auto"};
                  `,
                  scrollBarStyle
                )}
              >
                <div
                  className={css`
                    width: 100%;
                    height: 100%;
                    min-height: 800px;
                  `}
                >
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
                        min-height: 100vh;
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
                </div>
              </div>
            </div>
          </DashboardRootContext.Provider>
        </ThemeCSSVariableProvider>
      </ConfigProvider>
    </DesignPageConext.Provider>
  );
}
