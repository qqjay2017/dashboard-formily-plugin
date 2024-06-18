import { Schema } from "@formily/react";
import { createStyles } from "antd-style";
import { cn } from "../../../utils";
import { css } from "@emotion/css";

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

export const Header1 = () => {
  const { styles } = useHeader1Styles();
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
        `
      )}
    >
      index
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
