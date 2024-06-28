import React, { PropsWithChildren } from "react";
import { FormItemComponentProps } from "../../../../types";
import { InputNumber } from "antd";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";

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

export const PositionDecoratorFormItem = observer(
  ({ value, onChange }: FormItemComponentProps) => {
    return (
      <div>
        <PositionItemWrap>
          <InputNumber
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
            value={value.h}
            addonBefore="高度"
            onBlur={(e) => {
              value.h = e.target.value || 0;
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            value={value.x}
            addonBefore="X坐标"
            onBlur={(e) => {
              value.x = e.target.value || 0;
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            value={value.y}
            addonBefore="Y坐标"
            onBlur={(e) => {
              value.y = e.target.value || 0;
            }}
          />
        </PositionItemWrap>
        <PositionItemWrap>
          <InputNumber
            value={value.zIndex}
            addonBefore="层级"
            onBlur={(e) => {
              value.zIndex = e.target.value || 1;
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
