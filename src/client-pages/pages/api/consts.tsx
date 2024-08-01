import {
  TbBrandAdonisJs,
  TbEmergencyBed,
  TbHttpConnect,
  TbJson,
} from "react-icons/tb";

export const allApiType = [
  {
    key: "json",
    label: "JSON数据集",
    icon: <TbJson />,
  },
  {
    key: "js",
    label: "JS数据集",
    icon: <TbBrandAdonisJs />,
  },
  {
    key: "http",
    label: "HTTP数据集",
    icon: <TbHttpConnect />,
  },
  {
    key: "magic",
    label: "magic-api",
    icon: <TbEmergencyBed />,
  },
];

export type IApiTypeItem = (typeof allApiType)[0];

export const chartTypeOptions = allApiType.map((type) => {
  return {
    label: type.label,
    value: type.key,
  };
});

export const chartTypeNameMap = chartTypeOptions.reduce((memo, cur) => {
  memo[cur.value] = cur.label;
  return memo;
}, {});

export const defaultApiTemplate = "option = {}";
