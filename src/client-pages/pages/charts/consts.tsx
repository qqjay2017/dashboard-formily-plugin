import {
  RiBarChartLine,
  RiBubbleChartLine,
  RiLineChartLine,
  RiPieChartLine,
} from "react-icons/ri";

export const allChartType = [
  {
    key: "line",
    label: "折线图",
    icon: <RiLineChartLine />,
  },
  {
    key: "bar",
    label: "柱状图",
    icon: <RiBarChartLine />,
  },
  {
    key: "pie",
    label: "饼图",
    icon: <RiPieChartLine />,
  },
  {
    key: "other",
    label: "其他",
    icon: <RiBubbleChartLine />,
  },
];

export type IChartTypeItem = (typeof allChartType)[0];

export const chartTypeOptions = allChartType.map((type) => {
  return {
    label: type.label,
    value: type.key,
  };
});

export const chartTypeNameMap = chartTypeOptions.reduce((memo, cur) => {
  memo[cur.value] = cur.label;
  return memo;
}, {});

export const defaultChartTemplate = "option = {}";
