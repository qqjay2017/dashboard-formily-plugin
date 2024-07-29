import { TinyColor } from '@ctrl/tinycolor'
import { darkColorTextLabel, lightColorTextLabel, lightColorTextSecondLabel, textCommonBase, textCommonRgb } from '../consts'

const darkMainColor = new TinyColor('#00FFB2')
const lightMainColor = new TinyColor('#007350')
const primary = new TinyColor('#007350')
const textMenuLight = new TinyColor('#0EA778')
const textMenuDark = new TinyColor('#79E8C7')

export const greenToken = {
  colorTextLabel: primary.setAlpha(0.8).toRgbString(),

  textWhite: '#fff',
  textCommon: '#c3d4e5',
  textLight: '#333',
  textPrimary: primary.toRgbString(),
  textNoselect: primary.setAlpha(0.5).toRgbString(),
  textSelect: primary.toRgbString(),
  textTag: primary.setAlpha(0.8).toRgbString(),
  textNum: '#ffdc2f',
  textNumLight: '#f4a52e',
  thumbColor: 'rgba(59, 120, 239, 0.5)',
  frame: {
    startColor: '#154c8d',
    endColor: 'rgba(21, 76, 141, 0.14)',
  },
  table: {
    colorHeaderForeground: textCommonBase.setAlpha(0.7).toRgbString(),
    colorHeaderBg: 'rgba(255,255,255,0.06)',
    colorRowBg: 'rgba(255,255,255,0.03)',
    colorRowForeground: textCommonBase.setAlpha(0.6).toRgbString(),

  },
  chartColors: [
    '#6998F3',
    '#87E15E',
    '#F7BA5F',
    '#FFE460',
    '#10D4FF',
    '#FF7777',
  ],
}

export const greenDarkToken = {
  thumbColor: darkMainColor.setAlpha(0.5).toRgbString(),
  colorTextSecondLabel: darkColorTextLabel,
  colorTextLabel: darkColorTextLabel,
  colorPrimary: '#00FFB2',
  textCommon: textCommonRgb,
  textNumBlue: '#64E3FF',
  textNumGreen: '#59FFCD',
  textNumRed: '#FF7777',

  nodeContentForeground: '#96CDFF',
  nodeContentBg: 'rgba(4, 73, 73, 0.60)',
  textMenuSelect: '#00D997',
  textMenu: '#79E8C7',
  popover: {
    bg: '#005656',
    foreground: '#4DA1AC',
    border: '#076C6C',
    accentBg: '#15786C',
    accentForeground: '#C3E5DF',
  },

}
export const greenLightToken = {
  thumbColor: lightMainColor.setAlpha(0.5).toRgbString(),
  colorTextSecondLabel: lightColorTextSecondLabel,
  colorTextLabel: lightColorTextLabel,
  colorPrimary: '#007350',
  textCommon: '#333',
  textNumBlue: '#6998F3',
  textNumGreen: '#47D107',
  textNumRed: '#FF7777',

  nodeContentForeground: '#007350',
  nodeContentBg: 'rgba(255, 255, 255, 0.2)',
  textMenuSelect: '#007652',
  textMenu: '#0EA778',
  popover: {
    bg: new TinyColor('#B7D7FB').setAlpha(1).toRgbString(),
    foreground: new TinyColor('#007350;').setAlpha(1).toRgbString(),
    border: new TinyColor('#40C69F').setAlpha(0.5).toRgbString(),
    accentBg: new TinyColor('#fff').setAlpha(0.2).toRgbString(),
    accentForeground: '#007350',
  },
  chartColors: [
    '#6998F3',
    '#47D107',
    '#F7BA5F',
    '#FFE460',
    '#10D4FF',
    '#FF7777',
    '#6998F3',
    '#F7BA5F',
    '#FF7777',
  ],
  table: {
    colorHeaderForeground: lightColorTextLabel,
    colorHeaderBg: 'rgba(255,255,255,0.06)',
    colorRowBg: 'transparent',
    colorRowForeground: lightColorTextLabel,

  },
}
