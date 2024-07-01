import { FormItemComponentProps } from "@/types";
import { css } from "@emotion/css";
import { observer } from "@formily/react";
import { InputNumber } from "antd";

const width = "100px";

export const DecoratorPaddingFormItem = observer(
  ({ value, onChange }: FormItemComponentProps) => {
    return (
      <div
        className={css`
          width: 100%;
          height: 140px;
          padding: 16px 4px;
          border: 1px dashed rgba(0, 0, 0, 0.8);
          /* background-color: rgba(0, 0, 0, 0.5); */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `}
      >
        <div
          className={css`
            width: 40px;
            height: 14px;
            background-color: #4aa7be;
            border: 1px dashed #ccc;
          `}
        ></div>
        <div
          className={css`
            position: absolute;
            width: ${width};
            top: 16px;
            left: 50%;
            margin-left: -40px;
          `}
        >
          <InputNumber
            addonBefore="上"
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
            width: ${width};
            top: 50%;
            right: 4px;
            margin-top: -12px;
          `}
        >
          <InputNumber
            addonBefore="右"
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
            width: ${width};
            bottom: 16px;
            left: 50%;
            margin-left: -40px;
          `}
        >
          <InputNumber
            addonBefore="下"
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
            width: ${width};
            top: 50%;
            left: 4px;
            margin-top: -12px;
          `}
        >
          <InputNumber
            addonBefore="左"
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
