import customed from './themes/customed.json'
import dark from './themes/dark.json'
import chalk from './themes/chalk.json'
import essos from './themes/essos.json'
import macarons from './themes/macarons.json'
import purplePassion from './themes/purple-passion.json'
import roma from './themes/roma.json'
import shine from './themes/shine.json'
import vintage from './themes/vintage.json'
import walden from './themes/walden.json'
import westeros from './themes/westeros.json'
import wonderland from './themes/wonderland.json'
import { technologyBlueDarkToken, technologyBlueLightToken, technologyBlueToken } from './TechnologyBlue'
import { greenDarkToken, greenLightToken, greenToken } from './green'

export * from './TechnologyBlue'
export * from './RomanRed'
export * from './hooks'

export const allThemes = [
  {
    name: 'technologyBlue',
    zhName: '科技蓝',
    token: technologyBlueToken,
    dark: technologyBlueDarkToken,
    light: technologyBlueLightToken,
    colors: dark.color,

  },
  // {
  //     name: "romanRed",
  //     zhName: "罗马红",
  //     token: romanRedToken,
  //     dark: romaDarkToken,
  //     light: romaLightToken,
  //     colors: roma.color,

  // },
  {
    name: 'green',
    zhName: '复古绿',
    token: greenToken,
    dark: greenDarkToken,
    light: greenLightToken,
    colors: walden.color,

  },

]

export const allThemeNameMap = allThemes.reduce((memo, cur) => {
  memo[cur.name] = cur
  return memo
}, {})

export const chartColors = {
  dark,
  customed,
  macarons,
  walden,
  purplePassion,
  vintage,
  chalk,
  westeros,
  wonderland,
  essos,
  shine,
  roma,
}
