
import { TinyColor } from '@ctrl/tinycolor';

const primary = new TinyColor("#007350")


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
    nodeContentForeground: "#96CDFF",
    nodeContentBg: 'rgba(4, 73, 73, 0.60)',
}
export const greenLightToken = {
    nodeContentForeground: "#007350",
    nodeContentBg: "rgba(255, 255, 255, 0.2)"
}