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
