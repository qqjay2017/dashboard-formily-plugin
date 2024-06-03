import React, {
  Fragment,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { defaultBreakpoints, sizeFormat } from "./utils";
import { useSchemaComponentContext } from "../../hooks";
import { RecursionField, useFieldSchema } from "@formily/react";
import { useBreakpoints, useRowProperties } from "./hooks";
import { allThemeNameMap } from "../../../dashboard-themes";
import { useDashboardRootStyle } from "./styles";

import { DashboardRootContext, DesignPageConext } from "./context";
import { cn } from "../../../utils";

import { ConfigProvider } from "antd";
import { ThemeCSSVariableProvider } from "../../../css-variable";

import { MoveableManage } from "./MoveableManage";

import { css } from "@emotion/css";
import { DesignPageHeader } from "./DesignPageHeader";
import { CanvasSetting } from "./CanvasSetting";
import { SchemaComponentSetting } from "./SchemaComponentSetting";

const MemorizedRecursionField = React.memo(RecursionField);
MemorizedRecursionField.displayName = "MemorizedRecursionField";

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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [designZoom, setDesignZoom] = useState(0.5);
  const { designable } = useSchemaComponentContext();
  const { breakpoint, width, height, ref } = useBreakpoints(breakpoints, 800);
  const isPc = breakpoint === "desktop" || breakpoint === "showroom";
  const rowHeight = sizeFormat(height / rows);
  const colWidth = cols && width ? sizeFormat(width / cols) : 0;
  // const scale = useMemo(() => {
  //   let scale = 1;
  //   if (!width || !height) {
  //     return scale;
  //   }

  //   if (width / height < designWidth / designHeight) {
  //     scale = width / designWidth;
  //   } else {
  //     scale = height / designHeight;
  //   }
  //   if (scale < 0.2) {
  //     return 0.2;
  //   }
  //   if (scale > 1.2) {
  //     return 1.2;
  //   }
  //   return scale;
  // }, [designWidth, designHeight, width, height]);
  const themeConfig = allThemeNameMap[themeProvider] || {};
  const themeToken = themeConfig?.token || {};
  const themeDarkOrLightToken = themeConfig?.[isDarkTheme ? "dark" : "light"];
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
            <Fragment key={index}>
              {/* TODO 有的时候可能不能用memo */}
              <MemorizedRecursionField name={schema.name} schema={schema} />
            </Fragment>
          );
        })}
      </>
    );
  }, [blockItems?.length]);

  const handleViewPortFit = () => {
    if (!scrollAreaRef.current) {
      return;
    }

    scrollAreaRef.current.scrollLeft = designWidth;
    scrollAreaRef.current.scrollTop = designHeight / 2 + 160;
  };

  useEffect(() => {
    handleViewPortFit();
  }, []);

  return (
    <DesignPageConext.Provider
      value={{
        designZoom,
        setDesignZoom,
      }}
    >
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
              scale: 1,
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
              <DesignPageHeader />
              <div
                className={css`
                  height: calc(100vh - 50px);
                  width: calc(100vw);
                  position: relative;
                  display: flex;
                  overflow: hidden;
                `}
              >
                <div
                  className={css`
                    height: 100%;
                    width: 300px;
                    position: relative;
                    overflow: hidden;
                  `}
                >
                  左边
                </div>

                <div
                  id="viewPort"
                  className={css`
                    height: calc(100%);
                    width: calc(100% - 600px);
                    position: relative;
                    overflow: hidden;

                    /*  */
                    background-color: #18181c;
                    background-image: linear-gradient(
                        #18181c 14px,
                        transparent 0
                      ),
                      linear-gradient(90deg, transparent 14px, #86909c 0);
                    background-size: 15px 15px, 15px 15px;
                  `}
                >
                  {/* 画布滚动容器 */}
                  <div
                    ref={scrollAreaRef}
                    className={css`
                      user-select: none;
                      height: calc(100% - 40px);
                      width: 100%;
                      position: relative;
                      overflow: auto;
                      scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
                      scrollbar-width: thin;
                      /*  */
                    `}
                  >
                    {/* 最大的画布 */}
                    <div
                      className={css`
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 2160px;
                        width: 3840px;
                      `}
                    >
                      {/* 居中定位 */}
                      <div
                        className={css`
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform-origin: 50% 0;
                          transform: translateY(-50%);
                        `}
                      >
                        <div
                          className={css`
                            pointer-events: auto;
                            list-style: none;
                          `}
                        >
                          <div
                            className={css`
                              overflow: hidden;
                              box-shadow: 0 8px 10px #1e1e1e1f;
                              width: ${designWidth * designZoom}px;
                              height: ${designHeight * designZoom}px;
                            `}
                          >
                            <div
                              className={css`
                                width: ${designWidth}px;
                                height: ${designHeight}px;
                                transform: scale(${designZoom});
                                border-color: #373739;
                                transition: all 0.4s;
                                position: relative;
                                transform-origin: left top;
                                background-size: cover;
                                overflow: hidden;
                              `}
                            >
                              <div
                                {...otherProps}
                                id="DashboardRoot"
                                ref={ref}
                                className={cn(
                                  rootStyle.styles,
                                  className,
                                  themeProvider
                                )}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  position: "relative",
                                  ...style,
                                }}
                              >
                                {RenderBlockItems}
                                {designable && <MoveableManage />}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CanvasSetting handleViewPortFit={handleViewPortFit} />
                </div>
                {/* 右边 */}
                <div
                  className={css`
                    height: 100%;
                    width: 300px;
                    position: relative;
                    overflow: hidden;
                  `}
                >
                  <SchemaComponentSetting />
                </div>
              </div>
            </div>
          </DashboardRootContext.Provider>
        </ThemeCSSVariableProvider>
      </ConfigProvider>
    </DesignPageConext.Provider>
  );
};
