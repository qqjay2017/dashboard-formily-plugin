
import { TinyColor } from '@ctrl/tinycolor';
import { darkColorTextLabel, lightColorTextLabel, lightColorTextSecondLabel, textCommonBase, textCommonRgb } from '../consts';

const darkMainColor = new TinyColor("#3B78EF")
const lightMainColor = new TinyColor("#1D69B1")
const primary = textCommonBase;
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
    table: {
        colorHeaderForeground: textCommonBase.setAlpha(0.7).toRgbString(),
        colorHeaderBg: "rgba(255,255,255,0.06)",
        colorRowBg: "rgba(255,255,255,0.03)",
        colorRowForeground: textCommonBase.setAlpha(0.6).toRgbString()

    }


}

export const technologyBlueDarkToken = {
    thumbColor: darkMainColor.setAlpha(0.5).toRgbString(),
    colorTextSecondLabel: darkColorTextLabel,
    colorTextLabel: darkColorTextLabel,
    colorPrimary: "#1860EC",
    textCommon: textCommonRgb,

    textNumBlue: "#64E3FF",
    textNumGreen: "#59FFCD",
    textNumRed: "#FF7777",
    nodeContentForeground: textCommonRgb,
    nodeContentBg: 'rgba(0, 26, 58, 0.8)',
    textMenuSelect: "#349EFF",
    textMenu: "#79B2E8",
    popover: {
        bg: "#002D56",
        foreground: "#4D7DAC",
        border: "#0A386B",
        accentBg: "#154678",
        accentForeground: textCommonRgb
    },
    chartColors: [
        "#A4FCEE",
        "#84A6FF",
        "#76F5B0",
        "#64B7FB",
        "#6998F3",
        "#87E15E",
        "#F7BA5F",
        "#FFE460",
        "#10D4FF",
        "#FF7777"
    ],

}
export const technologyBlueLightToken = {
    thumbColor: lightMainColor.setAlpha(0.5).toRgbString(),
    colorTextSecondLabel: lightColorTextSecondLabel,
    colorTextLabel: lightColorTextLabel,
    colorPrimary: "#1D69B1",
    textCommon: "#333",
    textNumBlue: "#6998F3",
    textNumGreen: "#47D107",
    textNumRed: "#FF7777",
    nodeContentForeground: "#21619D",
    nodeContentBg: "rgba(234, 243, 255, 0.8)",
    textMenuSelect: "#257ACA",
    textMenu: "#458DE1",
    popover: {
        bg: new TinyColor("#83AFE9").setAlpha(0.2).toRgbString(),
        foreground: new TinyColor("#1D69B1").setAlpha(0.5).toRgbString(),
        border: new TinyColor("#5892D2").setAlpha(0.2).toRgbString(),
        accentBg: "rgba(255,255,255,0.2)",
        accentForeground: "#1D69B1"
    },
    chartColors: [
        "#6998F3",
        "#47D107",
        "#F7BA5F",
        "#FFE460",
        "#10D4FF",
        "#FF7777",
    ],
    table: {
        colorHeaderForeground: lightColorTextLabel,
        colorHeaderBg: "rgba(255,255,255,0.06)",
        colorRowBg: "transparent",
        colorRowForeground: lightColorTextLabel

    },

}