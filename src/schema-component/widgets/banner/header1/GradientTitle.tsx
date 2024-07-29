import { useTheme } from 'antd-style'
import React, { useMemo } from 'react'

export function GradientTitle({
  titleStr = '',
  textProps,
}: {
  titleStr: string
  textProps?: React.SVGTextElementAttributes<SVGTextElement>
}) {
  const { themeProvider, isDarkTheme } = useTheme()
  const startColor = useMemo(() => {
    if (themeProvider === 'technologyBlue') {
      if (isDarkTheme) {
        return '#76BDFF'
      }
      return '#1760A4'
    }
    if (themeProvider === 'green') {
      if (isDarkTheme) {
        return '#00FFD1'
      }
      return '#007350'
    }
  }, [isDarkTheme, themeProvider])
  const endColor = useMemo(() => {
    if (themeProvider === 'technologyBlue') {
      if (isDarkTheme) {
        return '#fff'
      }
      return '#1760A4'
    }
    if (themeProvider === 'green') {
      if (isDarkTheme) {
        return '#fff'
      }
      return '#007350'
    }
    return '#fff'
  }, [isDarkTheme, themeProvider])
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
        x="50%"
        y="40%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="url(#text-gradient)"
        fontSize="0.38rem"
        fontFamily="YouSheBiaoTiHei"
        letterSpacing="6px"
        {...textProps}
      >
        {titleStr}
      </text>
    </svg>
  )
}
