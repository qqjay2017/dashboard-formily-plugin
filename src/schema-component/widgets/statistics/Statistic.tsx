import { css } from "@emotion/css";
import React, { useMemo } from "react";
import { Schema } from "@formily/react";
import { DataSourceBind } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useReqApiProxy } from "../../../api-client";
import { get } from "lodash-es";
export const Statistic = ({
  title = "",
  amount,
  dataSource,
}: {
  title?: React.ReactNode;
  amount?: string | number | React.ReactNode;
  dataSource?: DataSourceBind;
}) => {
  const { request } = useReqApiProxy();
  const { data } = useQuery({
    queryKey: ["dataSourceQuery", dataSource?.dataSourceId],
    enabled: !!dataSource?.dataSourceId,
    queryFn: () =>
      request({
        apiId: dataSource?.dataSourceId,
      }),
  });

  const dataMemo = useMemo(() => {
    if (!data || !dataSource?.dataSourceId || !dataSource?.afterScript) {
      return amount;
    }
    console.log(dataSource.afterScript, "dataSource?.afterScript");
    try {
      const testHandle = new Function(
        "apiRes",
        "context",
        dataSource.afterScript
      );
      const r = testHandle(data, { get });
      if (typeof r === "object") {
        return JSON.stringify(r);
      }
      return r;
    } catch (error) {
      console.log(error, "函数执行报错");
      return amount;
    }
  }, [data, amount, dataSource?.dataSourceId, dataSource?.afterScript]);

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
        {dataMemo}
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
