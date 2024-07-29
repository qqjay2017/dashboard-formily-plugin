import React, { useState } from "react";
import { css } from "@emotion/css";
import { get } from "lodash-es";

import { EmpTypeSelect } from "./EmpTypeSelect";
import type { EmploymentType } from "./types";
import { EmploymentItem } from "./EmploymentItem";
import {
  useDataBindFetch,
  useFrameSizeStyle,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import type { SchemComponentWithDataSourceProps } from "@/types";
import { EmptyKit } from "@/themes/style-components";

export function EmploymentCreditMng({
  dataSource,
  query,
}: SchemComponentWithDataSourceProps) {
  const busParams = useQueryToBusParams(query);
  const { data, isLoading } = useDataBindFetch(dataSource, busParams);
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const [tabValue, setTabValue] = useState<string>("1");
  const list: EmploymentType[] = get(data, "data.data", []) || [];

  const curWorkList = list.filter((w) => {
    if (tabValue === "1") {
      return w.status === 0 || w.status === "0" || !w.status;
    } else {
      return w.status && (w.status === 1 || w.status === "1");
    }
  });
  return (
    <>
      <div
        style={headStyle}
        className={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
        `}
      >
        <EmpTypeSelect value={tabValue} onChange={setTabValue} />
      </div>
      <div
        style={bodyStyle}
        className={css`
          width: 100%;
          padding: 0.16rem;
          overflow: hidden auto;
        `}
      >
        <EmptyKit loading={isLoading} empty={!curWorkList.length}>
          <div
            className={css`
              width: 100%;
              min-height: 100%;
            `}
          >
            {curWorkList.map((work, index) => {
              return <EmploymentItem key={index} {...work} />;
            })}
          </div>
        </EmptyKit>
      </div>
    </>
  );
}
