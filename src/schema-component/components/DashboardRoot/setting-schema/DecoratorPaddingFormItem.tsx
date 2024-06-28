import { FormItemComponentProps } from "@/types";
import { css } from "@emotion/css";
import { observer } from "@formily/react";
import { Input, InputNumber } from "antd";
import React from "react";

export const DecoratorPaddingFormItem = observer(
  ({ value, onChange }: FormItemComponentProps) => {
    return (
      <div
        className={css`
          width: 100%;
          height: 100px;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `}
      >
        <div
          className={css`
            width: 40px;
            height: 24px;
            background-color: #4aa7be;
            border: 1px dashed #ccc;
          `}
        ></div>
        <div
          className={css`
            position: absolute;
            width: 80px;
            top: 4px;
            left: 50%;
            margin-left: -40px;
          `}
        >
          <InputNumber
            size="small"
            value={value[0]}
            onBlur={(e) => {
              value[0] = Number(e.target.value || 0);
            }}
          />
        </div>
        <div
          className={css`
            position: absolute;
            width: 80px;
            top: 50%;
            right: 4px;
            margin-top: -12px;
          `}
        >
          <InputNumber
            size="small"
            value={value[1]}
            onBlur={(e) => {
              value[1] = Number(e.target.value || 0);
            }}
          />
        </div>
        <div
          className={css`
            position: absolute;
            width: 80px;
            bottom: 4px;
            left: 50%;
            margin-left: -40px;
          `}
        >
          <InputNumber
            size="small"
            value={value[2]}
            onBlur={(e) => {
              value[2] = Number(e.target.value || 0);
            }}
          />
        </div>
        <div
          className={css`
            position: absolute;
            width: 80px;
            top: 50%;
            left: 4px;
            margin-top: -12px;
          `}
        >
          <InputNumber
            size="small"
            value={value[3]}
            onBlur={(e) => {
              value[3] = Number(e.target.value || 0);
            }}
          />
        </div>
      </div>
    );
  }
);
