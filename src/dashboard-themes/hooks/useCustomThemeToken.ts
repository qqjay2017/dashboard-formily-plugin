import { theme } from 'antd'
import { allThemeNameMap } from '@/dashboard-themes'

export function useCustomThemeToken({ themeProvider, isDarkTheme }: { themeProvider: string, isDarkTheme?: boolean }) {
  if (!themeProvider) {
    return {
      algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        isDarkTheme,
        themeProvider,
        themeAssetsPath: `${themeProvider}-${isDarkTheme ? 'dark' : 'light'
                    }`,
      },
    }
  }
  const themeConfig = allThemeNameMap[themeProvider] || {}
  const themeToken = themeConfig?.token || {}
  const themeDarkOrLightToken = themeConfig?.[isDarkTheme ? 'dark' : 'light']

  return {
    algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      isDarkTheme,
      themeProvider,
      themeAssetsPath: `${themeProvider}-${isDarkTheme ? 'dark' : 'light'
                }`,
      ...themeToken,
      ...themeDarkOrLightToken,
    },
  }
}
