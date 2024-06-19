
import { TinyColor } from '@ctrl/tinycolor';

const primary = new TinyColor("#c3d4e5")


export const technologyBlueToken = {

    textWhite: "#fff",
    textCommon: "#c3d4e5",
    textLight: "#34daff",
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

export const technologyBlueDarkToken = {
    nodeContentForeground: "#C3D4E5",
    nodeContentBg: 'rgba(0, 26, 58, 0.8)',
}
export const technologyBlueLightToken = {
    nodeContentForeground: "#333333",
    nodeContentBg: "rgba(234, 243, 255, 0.8)"
}