import { createStyles } from 'antd-style'
import { rs } from '../../../utils'

export const useDashboardRootStyle = createStyles(
  (
    { css },
    {
      themeProvider,
      isDarkTheme,
    }: {
      themeProvider: string
      isDarkTheme: boolean
    },
  ) => {
    const darkImg = rs(
      `/assets/dashboardRoot/${themeProvider}-dark/main-bg.png`,
    )
    const lightImg = rs(
      `/assets/dashboardRoot/${themeProvider}-light/main-bg.png`,
    )
    if (isDarkTheme) {
      const darkColor = themeProvider === 'technologyBlue' ? '#c3d4e5' : '#fff'
      return css`
        background-image: url(${darkImg});
        color: ${darkColor};
      `
    }
    else {
      return css`
        background-image: url(${lightImg});
        color: #000;
      `
    }
  },
)

export const useScrollBarStyle = createStyles(
  ({ css }, { thumbColor }: { thumbColor: string }) => {
    return css`
      scrollbar-color: ${thumbColor} transparent;
      scrollbar-width: thin;
      ::-webkit-scrollbar,
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      ::-webkit-scrollbar-thumb,
      ::-webkit-scrollbar-thumb {
        background: ${thumbColor};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-track-piece,
      ::-webkit-scrollbar-track-piece {
        background: transparent;
      }

      * {
        scrollbar-color: ${thumbColor} transparent;
        scrollbar-width: thin;
        ::-webkit-scrollbar,
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-thumb,
        ::-webkit-scrollbar-thumb {
          background: ${thumbColor};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar-track-piece,
        ::-webkit-scrollbar-track-piece {
          background: transparent;
        }
      }
    `
  },
)
