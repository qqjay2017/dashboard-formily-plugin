import { css } from "@emotion/css";
import { get } from "lodash-es";

import type { SchemComponentWithDataSourceProps } from "@/types";
import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import { DataTable } from "@/dashboard-themes/ui";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

interface ProjectAttendanceItem {
  projectName: string;
  attendanceNum: number;
  manageAttendanceNum: number;
  attendanceRate: string;
  shutFlag: number;
}

function ProjectAttendanceAnaTableMain({
  busDataRes,
}: SchemComponentWithDataSourceProps) {
  const projectAttendance: ProjectAttendanceItem[] = (
    get(busDataRes, "data.data", []) || []
  ).map((d, index) => {
    return {
      ...d,
      id: String(index),
    };
  });
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        overflow: hidden;
      `}
    >
      <DataTable
        data={projectAttendance}
        columns={[
          {
            accessorKey: "projectName",
            header: () => "项目名称",
          },
          {
            accessorKey: "attendanceNum",
            header: () => "项目出勤人数",
            size: 110,
          },
          {
            accessorKey: "manageAttendanceNum",
            header: () => "管理出勤人数",
            size: 110,
          },
          {
            accessorKey: "attendanceRate",
            header: () => "出勤率",
            size: 110,
            cell: (info) => {
              return `${info.getValue() || 0}%`;
            },
          },
        ]}
      />
    </div>
  );
}

export const ProjectAttendanceAnaTable = injectApiInfo(
  ProjectAttendanceAnaTableMain
);
