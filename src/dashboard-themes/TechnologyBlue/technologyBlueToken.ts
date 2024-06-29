
import { TinyColor } from '@ctrl/tinycolor';

const primary = new TinyColor("#c3d4e5")
const textMenuLight = new TinyColor("#257ACA")
const textMenuDark = new TinyColor("#3C90DD")


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
    },


}

export const technologyBlueDarkToken = {

    colorPrimary: "#1860EC",
    textCommon: "#C3D4E5",

    textNumBlue: "#64E3FF",
    textNumGreen: "#59FFCD",
    textNumRed: "#FF7777",
    nodeContentForeground: "#C3D4E5",
    nodeContentBg: 'rgba(0, 26, 58, 0.8)',
    textMenuSelect: "#349EFF",
    textMenu: "#79B2E8",
    popover: {
        bg: "#002D56",
        foreground: "#4D7DAC",
        border: "#0A386B",
        accentBg: "#154678",
        accentForeground: "#C3D4E5"
    }
}
export const technologyBlueLightToken = {
    colorPrimary: "#1D69B1",
    textCommon: "#333",
    textNumBlue: "#6998F3",
    textNumGreen: "#47D107",
    textNumRed: "#FF7777",
    nodeContentForeground: "#333333",
    nodeContentBg: "rgba(234, 243, 255, 0.8)",
    textMenuSelect: "#257ACA",
    textMenu: "#458DE1",
    popover: {
        bg: new TinyColor("#83AFE9").setAlpha(0.2).toRgbString(),
        foreground: new TinyColor("#1D69B1").setAlpha(0.5).toRgbString(),
        border: new TinyColor("#5892D2").setAlpha(0.2).toRgbString(),
        accentBg: "rgba(255,255,255,0.2)",
        accentForeground: "#1D69B1"
    }
}