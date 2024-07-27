import type { MappingAlgorithm } from 'antd'
import { theme } from 'antd'
import type { ThemeConfig } from './type'

/**
 * 该算法用于计算自定义的一些 token
 */
export const customAlgorithm: MappingAlgorithm = (designToken, derivativeToken) => {
  const result: ThemeConfig['token'] = derivativeToken || theme.defaultAlgorithm(designToken)

  if (result.paddingPageHorizontal === undefined) {
    result.paddingPageHorizontal = result.sizeLG
  }
  if (result.paddingPageVertical === undefined) {
    result.paddingPageVertical = result.sizeLG
  }
  if (result.paddingPopupHorizontal === undefined) {
    result.paddingPopupHorizontal = result.sizeLG
  }
  if (result.paddingPopupVertical === undefined) {
    result.paddingPopupVertical = result.size
  }
  if (result.marginBlock === undefined) {
    result.marginBlock = result.sizeLG
  }
  if (result.borderRadiusBlock === undefined) {
    result.borderRadiusBlock = result.borderRadiusLG
  }

  return result as any
}

export function addCustomAlgorithmToTheme(theme: ThemeConfig) {
  if (Array.isArray(theme.algorithm)) {
    if (!theme.algorithm.includes(customAlgorithm)) {
      theme.algorithm.push(customAlgorithm)
    }
  }
  else {
    theme.algorithm = [theme.algorithm, customAlgorithm].filter(Boolean)
  }
  theme.algorithm = theme.algorithm.filter(Boolean)
  return theme
}
