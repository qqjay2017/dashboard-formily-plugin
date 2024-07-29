import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { Schema } from "@formily/react";
import { observer } from "@formily/reactive-react";

import { defaultBreakpoints, flexible } from "@/utils/utils";
import {
  useDashboardRootStyle,
  useScrollBarStyle,
} from "@/schema-component/components/DashboardRoot/styles";
import { DashboardRootContext } from "@/schema-component/components/DashboardRoot/context";
import { createBehavior, createResource } from "@/designable/core";
import { type DnFC, useDesigner, useTreeRootProps } from "@/designable/react";
import { cn, sizeFormat } from "@/utils";
import { useCustomThemeToken } from "@/dashboard-themes";

import { fontStyle } from "@/themes/global-theme/font-style";
import type { DashboardRootProps } from "@/schema-component";
import { ThemeCSSVariableProvider } from "@/themes/css-variable";

interface IRootProps extends DashboardRootProps {}
export const Root: DnFC<IRootProps> = observer(
  ({ children, ...props }: IRootProps) => {
    const {
      breakpoints = defaultBreakpoints,

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
    const { designWidth = 1920, designHeight = 1080 } = useTreeRootProps();
    const [designZoom, setDesignZoom] = useState(1);
    const breakpoint = "desktop";
    const width = 1920;
    const height = 1080;
    const designer = useDesigner();

    const designerProps = {
      [designer.props.nodeIdAttrName]: props["data-designer-node-id"],
    };
    const rootStyle = useDashboardRootStyle({
      themeProvider,
      isDarkTheme,
    });
    const isPc = breakpoint === "desktop" || breakpoint === "showroom";
    const rowHeight = isPc ? sizeFormat(height / rows) : 80;
    const colWidth = cols && width ? sizeFormat(width / cols) : 0;
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

    const { styles: scrollBarStyle } = useScrollBarStyle({
      thumbColor: customThemeToken.token.thumbColor,
    });

    if (!themeProvider) {
      return null;
    }
    return (
      <div
        id="Root"
        {...designerProps}
        style={{
          width: designWidth,
          height: designHeight,
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
                rootFieldSchema: new Schema({}),
                mobileRowHeight,
              }}
            >
              <div
                className={cx(
                  css`
                    width: 100%;
                    height: 100%;
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
                    min-height: 600px;
                    position: relative;
                  `}
                >
                  <div
                    // {...otherProps}
                    id="DashboardRoot"
                    className={cn(
                      fontStyle,
                      css`
                        pointer-events: auto;
                        background-size: cover;
                        background-position: center;
                        background-repeat: ${isPc ? "no-repeat" : "repeat"};
                        font-size: 0.14rem;
                        line-height: 1;
                        color: #ccc;
                        width: 100%;
                        height: 100%;
                        position: relative;
                        min-height: 100%;
                      `,
                      rootStyle.styles,
                      className,
                      themeProvider
                    )}
                    style={{
                      ...style,
                    }}
                  >
                    {width ? children : null}
                  </div>
                </div>
              </div>
            </DashboardRootContext.Provider>
          </ThemeCSSVariableProvider>
        </ConfigProvider>
      </div>
    );
  }
);

Root.Behavior = createBehavior({
  name: "Root",
  selector: "Root",
  designerProps: {
    droppable: true,
    defaultProps: {
      cols: 12,
      rows: 12,
      rowheight: 80,
      designWidth: 1920,
      designHeight: 1080,
      breakpoints: {
        showroom: 2600,
        desktop: 1300,
        tablet: 500,
        mobile: 0,
      },
      themeProvider: "technologyBlue",
      isDarkTheme: true,
    },
    propsSchema: {
      type: "object",
      properties: {
        themeProvider: {
          type: "string",
          title: "主题颜色",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "ColorTypeSelect",
        },
        isDarkTheme: {
          type: "boolearn",
          title: "主题风格",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "IsDarkThemeSelect",
        },
      },
    },
  },
});

Root.Resource = createResource({
  icon: "CardSource",
  elements: [
    {
      componentName: "Root",
      props: {
        type: "void",
        "x-component": "Root",
      },
    },
  ],
});
