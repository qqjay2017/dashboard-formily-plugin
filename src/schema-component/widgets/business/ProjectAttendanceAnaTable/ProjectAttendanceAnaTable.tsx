import { css } from "@emotion/css";
import { get } from "lodash-es";

import { DataTable } from "@/themes/style-components/ui";
import type { SchemComponentWithDataSourceProps } from "@/types";
import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";

interface ProjectAttendanceItem {
  projectName: string;
  attendanceNum: number;
  manageAttendanceNum: number;
  attendanceRate: string;
  shutFlag: number;
}

export function ProjectAttendanceAnaTable({
  dataSource,
  query,
}: SchemComponentWithDataSourceProps) {
  const queryParams = useQueryToBusParams(query);
  const { data } = useDataBindFetch(dataSource, queryParams);
  const projectAttendance: ProjectAttendanceItem[] = (
    get(data, "data.data", []) || []
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

ProjectAttendanceAnaTable.displayName = "ProjectAttendanceAnaTable";
