import { Schema } from "@formily/react";
import { createStyles, useTheme } from "antd-style";
import { cn } from "../../../utils";
import { css } from "@emotion/css";
import { PropsWithChildren, useMemo } from "react";

const useHeader1Styles = createStyles(({ css, token }) => {
  const { themeProvider, isDarkTheme } = token;

  if (themeProvider === "technologyBlue") {
    if (isDarkTheme) {
      return css`
        background-image: url("/assets/header1/darkBlue.png");
      `;
    }
    return css`
      background-image: url("/assets/header1/lightBlue.png");
    `;
  }
  return css``;
});

interface Header1Props extends PropsWithChildren {
  title?: string;
}
export const Header1 = ({ title }: Header1Props) => {
  const { styles } = useHeader1Styles();
  const { themeProvider, isDarkTheme } = useTheme();
  const startColor = useMemo(() => {
    if (themeProvider === "technologyBlue") {
      if (isDarkTheme) {
        return "#76BDFF";
      }
      return "#1760A4";
    }
  }, [isDarkTheme, themeProvider]);
  const endColor = useMemo(() => {
    if (themeProvider === "technologyBlue") {
      if (isDarkTheme) {
        return "#fff";
      }
      return "#1760A4";
    }
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
          @font-face {
            font-family: "YouSheBiaoTiHei";
            src: url("/assets/fonts/youshe.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
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
            viewBox="0 0 1920 120"
            width={1920}
            height={120}
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
              height={50}
              x="50%"
              y={50}
              text-anchor="middle"
              alignment-baseline="middle"
              fill="url(#text-gradient)"
              fontSize={"38px"}
              fontFamily="YouSheBiaoTiHei"
              letterSpacing={"5px"}
            >
              {title}
            </text>
          </svg>
        </div>
        {/* {title} */}
      </div>
    </div>
  );
};

export function Header1SchemeWrap(inject: any = {}) {
  return new Schema({
    _isJSONSchemaObject: true,
    version: "2.0",
    type: "void",
    "x-component": "Header1",
    "x-settings": "settings:block",
    "x-decorator": "PositionDecorator",
    "x-component-props": {
      title: "标题文字",
    },

    ...inject,
    "x-decorator-props": {
      ...inject?.["x-decorator-props"],
      w: 12,
      h: 1.33,
      padding: 0,
    },
  });
}

Header1.schema = Header1SchemeWrap();
