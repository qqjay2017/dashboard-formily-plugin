import {
  TbBrandAdonisJs,
  TbEmergencyBed,
  TbHttpConnect,
  TbJson,
} from "react-icons/tb";
import type { IApiType } from "./types";

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

export const typeConfig: Record<
  IApiType,
  { title: string; subTitle: string; icon?: React.ReactNode }
> = {
  json: {
    title: "JSON数据集",
    subTitle: "直接定义静态数据",
  },
  js: {
    title: "JS数据集",
    subTitle: "编写JS代码进行动态模拟数据创建",
  },

  http: {
    title: "HTTP数据集",
    subTitle: "接入第三方HTTP服务查询",
  },
  magic: {
    title: "脚本数据集",
    subTitle: "magic-api查询",
  },
};
