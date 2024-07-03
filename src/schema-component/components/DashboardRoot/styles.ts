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
          background-image: url(${rs("/assets/dashboardRoot/" + themeProvider + "-dark/main-bg.png")});
          color:  ${darkColor};
        `;
        } else {
            return css`
          background-image: url(${rs("/assets/dashboardRoot/" + themeProvider + "-light/main-bg.png")});
          color: #000;
        `;
        }

    }
);


export const useScrollBarStyle = createStyles(({ css, token }) => {
    return css`
    ::-webkit-scrollbar,
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb {
    background:${token.thumbColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent ;
  }

  ::-webkit-scrollbar-track-piece,
  ::-webkit-scrollbar-track-piece {
    background: transparent ;
  }

  * {
    ::-webkit-scrollbar,
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb {
      background: ${token.thumbColor};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent ;
    }
    ::-webkit-scrollbar-track-piece,
    ::-webkit-scrollbar-track-piece {
      background: transparent ;
    }
  }
    `
})