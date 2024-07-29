import { InputNumber } from "antd";
import { createPolyInput } from "../PolyInput";

function takeNumber(value: any) {
  const num = String(value)
    .trim()
    .replace(/[^\d.]+/, "");
  if (num === "") return;
  return Number(num);
}

function createUnitType(type: string) {
  return {
    type,
    component: InputNumber,
    checker(value: any) {
      return String(value).includes(type);
    },
    toInputValue(value: any) {
      return takeNumber(value);
    },
    toChangeValue(value: any) {
      return `${value || 0}${type}`;
    },
  };
}

function createSpecialSizeOption(type: string) {
  return {
    type,
    checker(value: any) {
      if (value === type) return true;
      return false;
    },
    toChangeValue() {
      return type;
    },
  };
}

const NormalSizeOptions = [
  createSpecialSizeOption("inherit"),
  createSpecialSizeOption("auto"),
  createUnitType("px"),
  createUnitType("%"),
  createUnitType("vh"),
  createUnitType("em"),
];

export const SizeInput = createPolyInput(NormalSizeOptions);

export const BackgroundSizeInput = createPolyInput([
  createSpecialSizeOption("cover"),
  createSpecialSizeOption("contain"),
  createUnitType("px"),
  createUnitType("%"),
  createUnitType("vh"),
  createUnitType("em"),
]);
