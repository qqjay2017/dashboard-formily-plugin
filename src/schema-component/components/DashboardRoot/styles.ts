import { createStyles } from "antd-style";
import { rs } from "../../../utils";

export const useDashboardRootStyle = createStyles(
    (
        { css },
        {
            themeProvider,
            isDarkTheme,
        }: {
            themeProvider: string;
            isDarkTheme: boolean;
        }
    ) => {
        if (themeProvider === "technologyBlue") {
            if (!isDarkTheme) {
                return css`
          background-image: url(${rs("/assets/jfLightTheme/main-bg.jpg")});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          font-size: 14px;
          color: #000;
        `;
            }
            return css`
        background-image: url(${rs("/assets/jfDarkTheme/main-bg.jpg")});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-size: 14px;
        color: #c3d4e5;
      `;
        }
    }
);