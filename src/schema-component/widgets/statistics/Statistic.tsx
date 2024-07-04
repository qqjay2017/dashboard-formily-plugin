import { css } from "@emotion/css";
import React from "react";
import { Schema } from "@formily/react";
import { DataSourceBindType } from "../../types";

import { StatisticMenuItem } from "./StatisticMenuItem";
import { StatisticSettingSchema } from "./StatisticSettingSchema";
import { useDataBindFetch } from "@/schema-component/hooks";
import { commonInitSchema } from "@/schema-component/core";
export function Statistic({
  title = "",
  amount,
  dataSource,
}: {
  title?: React.ReactNode;
  amount?: string | number | React.ReactNode;
  dataSource?: DataSourceBindType;
}) {
  const { data } = useDataBindFetch(dataSource);

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
        {data}
      </div>
    </div>
  );
}

export function StatisticSchemeWrap(inject: any = {}) {
  return new Schema({
    ...commonInitSchema,
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
      w: 1,
      h: 1,
      padding: [0, 0, 0, 0],
      ...inject?.["x-decorator-props"],
    },
  });
}
Statistic.displayName = "Statistic";
Statistic.schemaFn = StatisticSchemeWrap;
Statistic.menuItem = StatisticMenuItem;
Statistic.settingSchema = StatisticSettingSchema;
