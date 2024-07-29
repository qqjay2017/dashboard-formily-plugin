import { TinyColor } from '@ctrl/tinycolor'

const darkColorTextLabel = new TinyColor('#c3d4e5').toRgbString()
const lightColorTextLabel = new TinyColor('#333').toRgbString()
const lightColorTextSecondLabel = new TinyColor('#333').setAlpha(0.5).toRgbString()
const textCommonBase = new TinyColor('#c3d4e5')

const textCommonRgb = new TinyColor('#c3d4e5').toRgbString()
export {
  lightColorTextSecondLabel,
  lightColorTextLabel,
  darkColorTextLabel,
  textCommonBase,
  textCommonRgb,
}
