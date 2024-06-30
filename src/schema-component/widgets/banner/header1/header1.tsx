import { createStyles } from "@/style";
import { cn, rs } from "@/utils";
import { css } from "@emotion/css";
import { useTheme } from "antd-style";
import { PropsWithChildren, useMemo } from "react";
import { Header1SchemeWrap } from "./Header1SchemeWrap";
import { Header1MenuItem } from "./Header1MenuItem";
import { Header1SettingSchema } from "./Header1SettingSchema";
const useHeader1Styles = createStyles(({ css, token }) => {
  const { themeAssetsPath } = token;
  const url = rs("/assets/header1/" + themeAssetsPath + "/bg.png");
  return css`
    background-image: url(${url});
  `;
});

interface Header1Props extends PropsWithChildren {
  title?: string;
}
export function Header1({ title }: Header1Props) {
  const { styles } = useHeader1Styles();
  const { themeProvider, isDarkTheme } = useTheme();
  const startColor = useMemo(() => {
    if (themeProvider === "technologyBlue") {
      if (isDarkTheme) {
        return "#76BDFF";
      }
      return "#1760A4";
    }
    if (themeProvider === "green") {
      if (isDarkTheme) {
        return "#00FFD1";
      }
      return "#007350";
    }
  }, [isDarkTheme, themeProvider]);
  const endColor = useMemo(() => {
    if (themeProvider === "technologyBlue") {
      if (isDarkTheme) {
        return "#fff";
      }
      return "#1760A4";
    }
    if (themeProvider === "green") {
      if (isDarkTheme) {
        return "#fff";
      }
      return "#007350";
    }
    return "#fff";
  }, [isDarkTheme, themeProvider]);
  return (
    <div
      className={cn(
        styles,
        css`
          width: 100%;
          height: 100%;
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: center bottom;
          position: relative;
        `
      )}
    >
      <div
        className={css`
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        `}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          `}
        >
          <svg
            width={"100%"}
            height={"100%"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="text-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{
                    stopColor: startColor,
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset="1"
                  style={{
                    stopColor: endColor,
                    stopOpacity: 1,
                  }}
                />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="url(#text-gradient)"
              fontSize={"0.38rem"}
              fontFamily="YouSheBiaoTiHei"
              letterSpacing={"6px"}
            >
              {title}
            </text>
          </svg>
        </div>
        {/* {title} */}
      </div>
    </div>
  );
}
Header1.displayName = "Header1";
Header1.schemaFn = Header1SchemeWrap;
Header1.menuItem = Header1MenuItem;
Header1.settingSchema = Header1SettingSchema;
