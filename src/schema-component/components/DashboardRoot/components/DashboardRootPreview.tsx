import React, { Fragment, useEffect, useMemo, useState } from "react";
import { DashboardRootContext, DesignPageConext } from "../context";
import { ConfigProvider, theme } from "antd";
import { defaultBreakpoints, flexible, sizeFormat } from "../utils";
import { DashboardRootProps, MemorizedRecursionField } from "./DashboardRoot";
import { allThemeNameMap } from "../../../../dashboard-themes";
import { ThemeCSSVariableProvider } from "../../../../css-variable";
import { useBreakpoints, useRowProperties } from "../hooks";
import { useFieldSchema } from "@formily/react";
import { css } from "@emotion/css";
import { cn } from "../../../../utils";
import { useDashboardRootStyle } from "../styles";

export const DashboardRootPreview = ({
  children,
  ...props
}: DashboardRootProps) => {
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
  const { breakpoint, width, height, ref } = useBreakpoints(breakpoints, 800);
  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
  });
  const fieldSchema = useFieldSchema();
  const blockItems = useRowProperties();

  const RenderBlockItems = useMemo(() => {
    return (
      <>
        {blockItems.map((schema, index) => {
          return (
            <Fragment key={schema.name + index}>
              {/* TODO 有的时候可能不能用memo */}
              <MemorizedRecursionField name={schema.name} schema={schema} />
            </Fragment>
          );
        })}
      </>
    );
  }, [blockItems?.length]);
  const themeConfig = allThemeNameMap[themeProvider] || {};
  const themeToken = themeConfig?.token || {};
  const themeDarkOrLightToken = themeConfig?.[isDarkTheme ? "dark" : "light"];

  const isPc = breakpoint === "desktop" || breakpoint === "showroom";
  const rowHeight = sizeFormat(height / rows);
  const colWidth = cols && width ? sizeFormat(width / cols) : 0;
  useEffect(() => {
    if (isPc) {
      flexible(designWidth);
    } else if (breakpoint === "mobile") {
      flexible(750);
    } else if (breakpoint === "tablet") {
      flexible(1300);
    }
  }, [designWidth, isPc]);
  return (
    <DesignPageConext.Provider
      value={{
        designZoom,
        setDesignZoom,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            isDarkTheme,
            themeProvider,
            themeAssetsPath: `${themeProvider}-${
              isDarkTheme ? "dark" : "light"
            }`,
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
              scale: designZoom,
              rootFieldSchema: fieldSchema,
              mobileRowHeight,
            }}
          >
            <div
              className={css`
                width: 100vw;
                height: 100vh;
              `}
            >
              <div
                className={css`
                  width: 100vw;
                  height: 100vh;
                  position: relative;
                  background-size: cover;
                  overflow-x: hidden;
                  overflow-y: auto;
                `}
              >
                <div
                  className={css`
                    width: 100vw;
                    height: 100vh;
                    min-height: 44vw;
                  `}
                >
                  <div
                    // {...otherProps}
                    id="DashboardRoot"
                    ref={ref}
                    className={cn(
                      css`
                        @font-face {
                          font-family: "YouSheBiaoTiHei";
                          src: url("/assets/fonts/youshe.ttf")
                            format("truetype");
                          font-weight: normal;
                          font-style: normal;
                        }
                        @font-face {
                          font-family: "Digiface";
                          src: url("/assets/fonts/digiface.ttf")
                            format("truetype");
                          font-weight: normal;
                          font-style: normal;
                        }
                      `,
                      css`
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        font-size: 0.14rem;
                        line-height: 1;
                        color: #ccc;
                        width: 100%;
                        height: 100%;
                        position: relative;
                      `,
                      rootStyle.styles,
                      className,
                      themeProvider
                    )}
                    style={{
                      ...style,
                    }}
                  >
                    {RenderBlockItems}
                  </div>
                </div>
              </div>
            </div>
          </DashboardRootContext.Provider>
        </ThemeCSSVariableProvider>
      </ConfigProvider>
    </DesignPageConext.Provider>
  );
};
