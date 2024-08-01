import type { ThemeConfig as _ThemeConfig } from 'antd'
import type { AliasToken } from 'antd/es/theme/internal'

export interface CustomToken extends AliasToken {
  /** 顶部导航栏主色 */
  colorPrimaryHeader: string
  /** 导航栏背景色 */
  colorBgHeader: string
  /** 导航栏菜单背景色悬浮态 */
  colorBgHeaderMenuHover: string
  /** 导航栏菜单背景色激活态 */
  colorBgHeaderMenuActive: string
  /** 导航栏菜单文本色 */
  colorTextHeaderMenu: string
  /** 导航栏菜单文本色悬浮态 */
  colorTextHeaderMenuHover: string
  /** 导航栏菜单文本色激活态 */
  colorTextHeaderMenuActive: string

  /** UI 配置色 */
  colorSettings: string
  /** 鼠标悬浮时显示的背景色 */
  colorBgSettingsHover: string
  /** 鼠标悬浮时显示的边框色 */
  colorBorderSettingsHover: string

  /** 页面左右内边距 */
  paddingPageHorizontal: number
  /** 页面上下内边距 */
  paddingPageVertical: number

  /** 弹窗左右内边距 */
  paddingPopupHorizontal: number
  /** 弹窗上下内边距 */
  paddingPopupVertical: number

  /** 区块之间的间隔 */
  marginBlock: number
  /** 区块的圆角 */
  borderRadiusBlock: number

  /**
   * 大屏主题相关
   */
  nodeContentBg: string
  nodeContentForeground: string
  colorTextSecondLabel: string

  textWhite: string
  textCommon: string
  textLight: string
  textPrimary: string
  textNoselect: string
  textSelect: string
  textTag: string
  textNum: string
  textNumLight: string
  thumbColor: string
  themeProvider: string
  isDarkTheme?: boolean
  themeAssetsPath: string
  textNumBlue: string
  textNumGreen: string
  textNumRed: string
  textMenu: string
  textMenuSelect: string

  popover: {
    bg: string
    foreground: string
    border: string
    accentBg: string
    accentForeground: string
  }
  table: {
    colorHeaderForeground: string
    colorHeaderBg: string
    colorRowBg: string
    colorRowForeground: string

  }
  chartColors: string[]
}

type CustomToken1 = CustomToken

export interface ThemeConfig extends _ThemeConfig {
  name?: string
  token?: Partial<CustomToken>
}

export interface ThemeItem {
  id: number
  /** 主题配置内容，一个 JSON 字符串 */
  config: ThemeConfig
  /** 主题是否可选 */
  optional: boolean
  isBuiltIn?: boolean
}

export interface GlobalThemeContextProps {
  theme: ThemeConfig
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>
  setCurrentSettingTheme: (theme: ThemeConfig) => void
  getCurrentSettingTheme: () => ThemeConfig
  setCurrentEditingTheme: (themeItem: ThemeItem) => void
  getCurrentEditingTheme: () => ThemeItem
  isDarkTheme: boolean
}

declare module 'antd-style' {

  export interface CustomToken extends CustomToken1 { }
}
