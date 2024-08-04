import { Space, Tag } from "antd";
import { typeConfig } from "./consts";

export const typeColumns = [
  {
    title: "名称",
    dataIndex: "name",
    ellipsis: true,
    width: 140,
  },
  {
    title: "类型",
    dataIndex: "type",
    width: 100,
    render: (_, record) => {
      const typeName = typeConfig[record.type]?.title;
      return <Space>{typeName ? <Tag>{typeName}</Tag> : null}</Space>;
    },
  },
];

export const apiInfoColumns = [
  {
    title: "域名",
    dataIndex: "origin",
  },
  {
    title: "前缀",
    dataIndex: "baseName",
  },
  {
    title: "url",
    dataIndex: "url",
  },
  {
    title: "请求方式",
    dataIndex: "method",
    width: 100,
  },
];
