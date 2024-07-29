import { css } from "@emotion/css";
import { useState } from "react";

import { get } from "lodash-es";

import { RecentDateSelect } from "./RecentDateSelect";
import {
  ChartTemplateWithOutData,
  useDataBindFetch,
  useFrameSizeStyle,
  useQueryToBusParams,
} from "@/schema-component";

import type { SchemComponentWithDataSourceProps } from "@/types";

export function LaborAttendance({ query }: SchemComponentWithDataSourceProps) {
  const [tabValue, setTabValue] = useState<string>("1");
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const queryParams = useQueryToBusParams(query);
  const { data: dataRes } = useDataBindFetch(
    {
      dataSourceId: "38a353fc-d871-40ec-957a-69073e7128bc",
    },
    {
      ...queryParams,
      dateType: tabValue,
    }
  );

  const busData = get(dataRes, "data.data");

  return (
    <>
      <div
        style={headStyle}
        className={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.16rem;
        `}
      >
        <RecentDateSelect value={tabValue} onChange={setTabValue} />
      </div>
      <div
        style={bodyStyle}
        className={css`
          width: 100%;
          padding: 0.14rem 0.16rem;
          overflow: hidden hidden;
        `}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
          `}
        >
          <ChartTemplateWithOutData
            chartId="38"
            dataSource={null}
            query={null}
            busData={busData}
          />
        </div>
      </div>
    </>
  );
}
