import { css } from "@emotion/css";
import { get } from "lodash-es";
import { ZjxmsRightItem } from "./ZjxmsRightItem";

import { useToken } from "@/schema-component/antd/style";

import { getPercent, rs } from "@/utils";
import type { SchemComponentWithDataSourceProps } from "@/types";
import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";

interface ClockingData {
  projectNum?: number;
  allUserProjectNum?: number;
  sectionUserProjectNum?: number;
  unUserProjectNum?: number;
  allUserNum?: number;
  clockUserNum?: number;
  unClockUserNum?: number;
}

export function ProjectAttendanceDataAna({
  query,
  dataSource,
}: SchemComponentWithDataSourceProps) {
  const { token } = useToken();
  const queryParams = useQueryToBusParams(query);
  const { data: dataRes } = useDataBindFetch(dataSource, queryParams);
  const clocking: ClockingData = get(dataRes, "data.data", {}) || {};

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          height: 100%;
          max-height: 1.7rem;
          display: flex;
          align-items: center;
        `}
      >
        <div
          className={css`
            width: 1.03rem;
            height: 1.2rem;
            background-size: contain;
            background-repeat: no-repeat;
            position: relative;
            background-position: center bottom;
          `}
          style={{
            backgroundImage: `url( ${rs("/assets/personInfoMng/zjxms.png")} )`,
          }}
        >
          <div
            className={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 0.16rem;
              font-size: 0.16rem;
              line-height: 0.16rem;
              text-align: center;
              color: ${token.textCommon};
            `}
          >
            在建项目数
          </div>
          <div
            className={css`
              position: absolute;
              top: 30%;
              left: 0;
              width: 100%;
              height: 0.24rem;
              font-size: 0.24rem;
              line-height: 0.24rem;
              text-align: center;
              color: #fff;
              text-shadow: 2px 2px 10px ${token.textPrimary};
            `}
          >
            {`${clocking?.projectNum || 0}个`}
          </div>
        </div>

        <div
          className={css`
            flex: 1;
            padding-left: 0.24rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 4列 */
            grid-template-rows: repeat(2, 1fr); /* 2行 */
            gap: 0.16rem; /* 子项间距，可选 */
            height: 100%;
          `}
        >
          {[
            {
              label: "全员打卡项目数",
              count: clocking.allUserProjectNum || 0,
              unit: "个",
              countColor: token.textNumBlue,
            },
            {
              label: "部分打卡项目数",
              count: clocking.sectionUserProjectNum || 0,
              unit: "个",
              countColor: token.textNumGreen,
            },
            {
              label: "未打卡项目数",
              count: clocking.unUserProjectNum || 0,
              unit: "个",
              countColor: token.textNumRed,
            },
            {
              label: "未打卡项目占比",
              count: getPercent(
                clocking.unUserProjectNum,
                clocking?.projectNum,
                {
                  fixed: 0,
                }
              ),
              unit: "%",
              countColor: token.textNumGreen,
            },
            {
              label: "应打卡人数",
              count: clocking.allUserNum || 0,
              unit: "人",
              countColor: token.textNumBlue,
            },
            {
              label: "已打卡人数",
              count: clocking.clockUserNum || 0,
              unit: "人",
              countColor: token.textNumGreen,
            },
            {
              label: "未打卡人数",
              count: clocking.unClockUserNum || 0,
              unit: "人",
              countColor: token.textNumRed,
            },
            {
              label: "打卡人数占比",
              count: getPercent(clocking.clockUserNum, clocking.allUserNum, {}),
              unit: "%",
              countColor: token.textNumGreen,
            },
          ].map((item, index) => {
            return <ZjxmsRightItem key={item.label + index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}
