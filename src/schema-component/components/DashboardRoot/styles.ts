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

        if (isDarkTheme) {
            const darkColor = themeProvider === 'technologyBlue' ? "#c3d4e5" : "#fff"
            return css`
          background-image: url(${rs("/assets/dashboardRoot/" + themeProvider + "-dark/main-bg.jpg")});
          color:  ${darkColor};
        `;
        } else {
            return css`
          background-image: url(${rs("/assets/dashboardRoot/" + themeProvider + "-light/main-bg.jpg")});
          color: #000;
        `;
        }

    }
);
