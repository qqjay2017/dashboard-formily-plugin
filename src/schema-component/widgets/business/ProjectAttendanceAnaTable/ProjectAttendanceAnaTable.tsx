import { DataTable } from "@/ui";
import { css } from "@emotion/css";
import { getSchemeWrap } from "./getSchemeWrap";
import { menuItem } from "./menuItem";
import { settingSchema } from "./settingSchema";

const projectAttendance = [
  {
    projectName: "安溪县城炭坑溪片区治涝工程",
    attendanceNum: 22,
    manageAttendanceNum: 37,
    attendanceRate: "18",
    shutFlag: 1,
  },
  {
    projectName: "采购调入项目",
    attendanceNum: 80,
    manageAttendanceNum: 58,
    attendanceRate: "50",
    shutFlag: 0,
  },
  {
    projectName: "采购项目",
    attendanceNum: 73,
    manageAttendanceNum: 15,
    attendanceRate: "57",
    shutFlag: 0,
  },
  {
    projectName: "福建省德化职业技术学校二期控规用地建设项目工程",
    attendanceNum: 46,
    manageAttendanceNum: 57,
    attendanceRate: "46",
    shutFlag: 1,
  },
  {
    projectName: "华能霞浦核电项目施工供水工程",
    attendanceNum: 48,
    manageAttendanceNum: 38,
    attendanceRate: "45",
    shutFlag: 0,
  },
  {
    projectName: "华能霞浦核电项目施工供水工程（重新建项目）测试",
    attendanceNum: 11,
    manageAttendanceNum: 20,
    attendanceRate: "68",
    shutFlag: 0,
  },
  {
    projectName: "华润大夏A座20楼",
    attendanceNum: 38,
    manageAttendanceNum: 97,
    attendanceRate: "70",
    shutFlag: 0,
  },
  {
    projectName: "金门供水水源保障工程（溪边-龙湖段）",
    attendanceNum: 73,
    manageAttendanceNum: 3,
    attendanceRate: "94",
    shutFlag: 1,
  },
  {
    projectName: "临港新区高新科技产业园配套项目一标段",
    attendanceNum: 12,
    manageAttendanceNum: 12,
    attendanceRate: "22",
    shutFlag: 0,
  },
  {
    projectName: "前园片区改造—安置区",
    attendanceNum: 62,
    manageAttendanceNum: 27,
    attendanceRate: "48",
    shutFlag: 1,
  },
  {
    projectName:
      "泉南国家高速公路改扩建新增永春锦斗出入口及接线工程设计施工总承包（EPC）项目",
    attendanceNum: 36,
    manageAttendanceNum: 33,
    attendanceRate: "54",
    shutFlag: 1,
  },
  {
    projectName: "泉州金屿大桥工程",
    attendanceNum: 78,
    manageAttendanceNum: 37,
    attendanceRate: "49",
    shutFlag: 1,
  },
  {
    projectName: "泉州软件园二期体育公园工程",
    attendanceNum: 58,
    manageAttendanceNum: 46,
    attendanceRate: "57",
    shutFlag: 1,
  },
  {
    projectName: "泉州市菱溪水库至泉港区供水工程PPP项目",
    attendanceNum: 10,
    manageAttendanceNum: 59,
    attendanceRate: "63",
    shutFlag: 0,
  },
  {
    projectName: "思明万达广场",
    attendanceNum: 58,
    manageAttendanceNum: 81,
    attendanceRate: "31",
    shutFlag: 0,
  },
  {
    projectName: "厦门华润大夏A座",
    attendanceNum: 37,
    manageAttendanceNum: 96,
    attendanceRate: "67",
    shutFlag: 0,
  },
  {
    projectName:
      "翔安南部片区启动区A1地块-子地块A1-1/A1-2基坑支护、桩基、土石方工程",
    attendanceNum: 71,
    manageAttendanceNum: 54,
    attendanceRate: "57",
    shutFlag: 1,
  },
  {
    projectName:
      "翔安南部片区启动区A1地块-子地块A1-3/A1-4基坑支护、桩基、土石方工程",
    attendanceNum: 36,
    manageAttendanceNum: 55,
    attendanceRate: "67",
    shutFlag: 1,
  },
  {
    projectName:
      "翔安南部片区启动区A1地块-子地块A1-5/A1-6基坑支护、桩基、土石方工程",
    attendanceNum: 54,
    manageAttendanceNum: 34,
    attendanceRate: "8",
    shutFlag: 1,
  },
  {
    projectName: "质量测试",
    attendanceNum: 42,
    manageAttendanceNum: 72,
    attendanceRate: "31",
    shutFlag: 0,
  },
  {
    projectName: "质量测试1000",
    attendanceNum: 38,
    manageAttendanceNum: 19,
    attendanceRate: "80",
    shutFlag: 0,
  },
];

export const ProjectAttendanceAnaTable = () => {
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
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
            size: 80,
          },
          {
            accessorKey: "manageAttendanceNum",
            header: () => "管理出勤人数",
            size: 80,
          },
          {
            accessorKey: "attendanceRate",
            header: () => "出勤率",
            size: 60,
            cell: (info) => {
              return `${info.getValue() || 0}%`;
            },
          },
        ]}
      />
    </div>
  );
};

ProjectAttendanceAnaTable.displayName = "ProjectAttendanceAnaTable";
ProjectAttendanceAnaTable.schemaFn = getSchemeWrap;
ProjectAttendanceAnaTable.menuItem = menuItem;
ProjectAttendanceAnaTable.settingSchema = settingSchema;
