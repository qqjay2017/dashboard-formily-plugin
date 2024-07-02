import React from "react";
import { ZjxmsRightItem } from "./ZjxmsRightItem";
import { getPercent } from "@/schema-component/utils";
import { css } from "@emotion/css";
import { getSchemeWrap } from "./getSchemeWrap";
import { menuItem } from "./menuItem";
import { settingSchema } from "./settingSchema";

const projectNum = 20;

const clocking = {
  allUserProjectNum: 22,
  sectionUserProjectNum: 44,
  unUserProjectNum: 5,
  allUserNum: 12,
  clockUserNum: 32,
  unClockUserNum: 12,
};

export const ProjectAttendanceDataAna = () => {
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
            backgroundImage: `url( "/assets/personInfoMng/zjxms.png" )`,
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
              color: rgba(195, 212, 229, 0.7);
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
              text-shadow: 0px 0px 10px #2193db;
            `}
          >{`${projectNum || 0}个`}</div>
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
              count: clocking.allUserProjectNum,
              unit: "个",
              countColor: "#64E3FF",
            },
            {
              label: "部分打卡项目数",
              count: clocking.sectionUserProjectNum,
              unit: "个",
              countColor: "#87E15E",
            },
            {
              label: "未打卡项目数",
              count: clocking.unUserProjectNum,
              unit: "个",
              countColor: "#FF7777",
            },
            {
              label: "未打卡项目占比",
              count: getPercent(clocking.unUserProjectNum, projectNum, {
                fixed: 0,
              }),
              unit: "%",
              countColor: "#59FFCD",
            },
            {
              label: "应打卡人数",
              count: clocking.allUserNum,
              unit: "人",
              countColor: "#64E3FF",
            },
            {
              label: "已打卡人数",
              count: clocking.clockUserNum,
              unit: "人",
              countColor: "#87E15E",
            },
            {
              label: "未打卡人数",
              count: clocking.unClockUserNum,
              unit: "人",
              countColor: "#FF7777",
            },
            {
              label: "打卡人数占比",
              count: getPercent(clocking.clockUserNum, clocking.allUserNum, {}),
              unit: "%",
              countColor: "#59FFCD",
            },
          ].map((item, index) => {
            return <ZjxmsRightItem key={item.label + index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

ProjectAttendanceDataAna.displayName = "ProjectAttendanceDataAna";
ProjectAttendanceDataAna.schemaFn = getSchemeWrap;
ProjectAttendanceDataAna.menuItem = menuItem;
ProjectAttendanceDataAna.settingSchema = settingSchema;
