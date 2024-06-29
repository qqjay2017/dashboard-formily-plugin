
import { TinyColor } from '@ctrl/tinycolor';

const primary = new TinyColor("#007350")
const textMenuLight = new TinyColor("#0EA778")
const textMenuDark = new TinyColor("#79E8C7")

export const greenToken = {

    textWhite: "#fff",
    textCommon: "#c3d4e5",
    textLight: "#333",
    textPrimary: primary.toRgbString(),
    textNoselect: primary.setAlpha(0.5).toRgbString(),
    textSelect: primary.toRgbString(),
    textTag: primary.setAlpha(0.8).toRgbString(),
    textNum: "#ffdc2f",
    textNumLight: "#f4a52e",
    thumbColor: "rgba(59, 120, 239, 0.5)",
    frame: {
        startColor: "#154c8d",
        endColor: "rgba(21, 76, 141, 0.14)"
    }
}

export const greenDarkToken = {
    colorPrimary: "#00FFB2",
    textCommon: "#C3D4E5",
    textNumBlue: "#64E3FF",
    textNumGreen: "#59FFCD",
    textNumRed: "#FF7777",

    nodeContentForeground: "#96CDFF",
    nodeContentBg: 'rgba(4, 73, 73, 0.60)',
    textMenuSelect: "#00D997",
    textMenu: textMenuDark.setAlpha(0.65).toRgbString(),
}
export const greenLightToken = {
    colorPrimary: "#007350",
    textCommon: "#333",
    textNumBlue: "#6998F3",
    textNumGreen: "#47D107",
    textNumRed: "#FF7777",

    nodeContentForeground: "#007350",
    nodeContentBg: "rgba(255, 255, 255, 0.2)",
    textMenuSelect: textMenuLight,
    textMenu: textMenuLight.setAlpha(0.45).toRgbString(),
}