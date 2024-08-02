import { css } from "@emotion/css";
import { useState } from "react";

import { get } from "lodash-es";

import { ChartTemplateWithOutData } from "../../chart";
import { RecentDateSelect } from "./RecentDateSelect";

import type { SchemComponentWithDataSourceProps } from "@/types";
import {
  useDataBindFetch,
  useFrameSizeStyle,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

function LaborAttendanceMain({
  busDataRes,
}: SchemComponentWithDataSourceProps) {
  const [tabValue, setTabValue] = useState<string>("1");
  const { headStyle, bodyStyle } = useFrameSizeStyle();

  const busData = get(busDataRes, "data.data");

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
            apiInfo={null}
            queryKeys={[]}
            busData={busData}
          />
        </div>
      </div>
    </>
  );
}

export const LaborAttendance = injectApiInfo(LaborAttendanceMain);
