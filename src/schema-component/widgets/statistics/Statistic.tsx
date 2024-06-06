import { css } from "@emotion/css";
import React from "react";
import { Schema, useField, useFieldSchema } from "@formily/react";
export const Statistic = ({
  title = "",
  amount,
}: {
  title?: React.ReactNode;
  amount?: string | number | React.ReactNode;
}) => {
  return (
    <div>
      <div
        className={css`
          font-weight: 400;
          font-size: 12px;
          color: rgba(195, 212, 229, 0.7);
          line-height: 14px;
          margin-bottom: 20px;
        `}
      >
        {title}
      </div>
      <div
        className={css`
          font-weight: 600;
          font-size: 18px;
          color: #59ffcd;
          line-height: 40px;
          text-align: left;
        `}
      >
        {amount}
      </div>
    </div>
  );
};

export function StatisticSchemeWrap(inject: any = {}) {
  return new Schema({
    _isJSONSchemaObject: true,
    version: "2.0",
    type: "void",
    "x-component": "Statistic",
    "x-settings": "settings:block",
    "x-decorator": "PositionDecorator",
    "x-component-props": {
      title: "默认标题",
      amount: "默认值",
    },

    ...inject,
    "x-decorator-props": {
      ...inject?.["x-decorator-props"],
      w: 1,
      h: 1,
    },
  });
}

Statistic.schema = StatisticSchemeWrap();
