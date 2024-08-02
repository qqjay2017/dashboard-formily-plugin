import { createForm } from "@formily/core";
import { FormProvider } from "@formily/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { css } from "@emotion/css";
import PreviewSchemaComponent from "./PreviewSchemaComponent";
import { DashboardRootContext } from "@/schema-component/components/context";
import { useBreakpoints, useScrollBarStyle } from "@/schema-component/hooks";
import { cx, sizeFormat } from "@/utils";
import { useCustomThemeToken } from "@/dashboard-themes";

function PreviewPageProvider({
  rows = 12,
  cols = 12,
  scope,
  designWidth,
  designHeight,
  themeProvider,
  children,
  isDarkTheme,
}: {
  isDarkTheme?: boolean;
  rows?: number;
  cols?: number;
  scope?: any;
  designWidth?: number;
  designHeight?: number;
  themeProvider?: string;
  children?: ReactNode;
}) {
  const { breakpoint, width, height, ref } = useBreakpoints(undefined, 300);
  const form = useMemo(() => {
    return createForm({
      designable: false,
      effects: () => {},
    });
  }, [breakpoint]);

  const isPc = breakpoint === "desktop" || breakpoint === "showroom";
  const rowHeight = isPc ? sizeFormat(height / rows) : 80;
  const colWidth = cols && width ? sizeFormat(width / cols) : 0;
  const customThemeToken = useCustomThemeToken({
    themeProvider,
    isDarkTheme,
  });

  const { styles: scrollBarStyle } = useScrollBarStyle({
    thumbColor: customThemeToken.token.thumbColor,
  });
  return (
    <FormProvider form={form} key={breakpoint}>
      <PreviewSchemaComponent
        scope={{
          dashboardDt: {},
          ...scope,
        }}
      >
        <div
          ref={ref}
          className={cx(
            scrollBarStyle,
            css`
              width: 100%;
              height: 100%;
              max-width: 100%;
              max-height: 100%;
              min-height: 650px;
              overflow-x: hidden;
              overflow-y: ${isPc ? "hidden" : "auto"};
            `
          )}
        >
          <DashboardRootContext.Provider
            value={{
              width,
              breakpoint,
              colWidth,
              rowHeight,
              isPc,
              scale: 1,
              mobileRowHeight: 80,
              designWidth,
              designHeight,
              themeProvider,
            }}
          >
            {children}
          </DashboardRootContext.Provider>
        </div>
      </PreviewSchemaComponent>
    </FormProvider>
  );
}

export default PreviewPageProvider;
