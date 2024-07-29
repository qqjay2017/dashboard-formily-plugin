import type { PropsWithChildren } from "react";
import React from "react";

import { InputNumber } from "antd";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import type { FormItemComponentProps } from "@/types";

function PositionItemWrap({ children }: PropsWithChildren) {
  return (
    <div
      className={css`
        margin-bottom: 12px;
      `}
    >
      {children}
    </div>
  );
}

const inputNumberStyle = {
  width: 250,
};

export const PositionDecoratorFormItem = observer(
  ({ value, onChange }: FormItemComponentProps) => {
    return (
      <div>
        <PositionItemWrap>
          <InputNumber
            style={inputNumberStyle}
            value={value.w}
            addonBefore="宽度"
            onBlur={(e) => {
              value.w = Number(e.target.value || 0);
              // onChange(value);
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            style={inputNumberStyle}
            value={value.h}
            addonBefore="高度"
            onBlur={(e) => {
              value.h = Number(e.target.value || 0);
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            style={inputNumberStyle}
            value={value.x}
            addonBefore="X坐标"
            onBlur={(e) => {
              value.x = Number(e.target.value || 0);
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            style={inputNumberStyle}
            value={value.y}
            addonBefore="Y坐标"
            onBlur={(e) => {
              value.y = Number(e.target.value || 0);
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            style={inputNumberStyle}
            value={value.zIndex}
            addonBefore="层级"
            onBlur={(e) => {
              value.zIndex = Number(e.target.value || 1);
            }}
          />
        </PositionItemWrap>
        {/* <PositionItemWrap>
          <div>
            <div
              className={css`
                width: 40px;
                height: 15px;
                background-color: #7fadb9;
              `}
            ></div>
          </div>
        </PositionItemWrap> */}
      </div>
    );
  }
);
