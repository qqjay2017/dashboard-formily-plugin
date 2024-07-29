// @ts-nocheck

/*
 * 支持文本、数字、布尔、表达式
 * Todo: JSON、富文本，公式
 */

import { Button, Input, InputNumber, Popover, Select } from "antd";
import { createPolyInput } from "../PolyInput";

import { TextWidget } from "@/designable/react";

const STARTTAG_REX =
  // eslint-disable-next-line regexp/no-dupe-disjunctions
  /<[-\w]+(?:\s+[a-z_:][-\w:.]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+))?)*\s*\/?>/i;

const EXPRESSION_REX = /^\{\{([\s\S]*)\}\}$/;

const isNumber = (value: any) => typeof value === "number";

const isBoolean = (value: any) => typeof value === "boolean";

function isExpression(value: any) {
  return typeof value === "string" && EXPRESSION_REX.test(value);
}

function isRichText(value: any) {
  return typeof value === "string" && STARTTAG_REX.test(value);
}

function isNormalText(value: any) {
  return (
    typeof value === "string" && !isExpression(value) && !isRichText(value)
  );
}

function takeNumber(value: any) {
  const num = String(value).replace(/[^\d.]+/, "");
  if (num === "") return;
  return Number(num);
}

export const ValueInput = createPolyInput([
  {
    type: "TEXT",
    icon: "Text",
    component: Input,
    checker: isNormalText,
  },
  {
    type: "EXPRESSION",
    icon: "Expression",
    component: (props: any) => {
      return (
        <Popover
          content={
            <div
              style={{
                width: 400,
                height: 200,
                marginLeft: -16,
                marginRight: -16,
                marginBottom: -12,
              }}
            >
              MonacoInput
            </div>
          }
          trigger="click"
        >
          <Button block>
            <TextWidget token="SettingComponents.ValueInput.expression" />
          </Button>
        </Popover>
      );
    },
    checker: isExpression,
    toInputValue: (value) => {
      if (!value || value === "{{}}") return;
      const matched = String(value).match(EXPRESSION_REX);
      return matched?.[1] || value || "";
    },
    toChangeValue: (value) => {
      if (!value || value === "{{}}") return;
      const matched = String(value).match(EXPRESSION_REX);
      return `{{${matched?.[1] || value || ""}}}`;
    },
  },
  {
    type: "BOOLEAN",
    icon: "Boolean",
    component: (props: any) => (
      <Select
        {...props}
        options={[
          { label: "True", value: true },
          { label: "False", value: false },
        ]}
      />
    ),
    checker: isBoolean,
    toInputValue: (value) => {
      return !!value;
    },
    toChangeValue: (value) => {
      return !!value;
    },
  },
  {
    type: "NUMBER",
    icon: "Number",
    component: InputNumber,
    checker: isNumber,
    toInputValue: takeNumber,
    toChangeValue: takeNumber,
  },
]);
