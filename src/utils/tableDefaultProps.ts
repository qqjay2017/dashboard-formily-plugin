import type { TableProps } from "antd";

export const tableDefaultScroll = {
  x: 2200,
  y: "calc(100vh - 270px)",
};

export const tableDefaultProps: TableProps = {
  scroll: tableDefaultScroll,
  pagination: false,
  rowKey: "id",
};
