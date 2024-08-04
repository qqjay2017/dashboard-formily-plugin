import { useState } from "react";

import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import { css } from "@emotion/css";
import { useApiManageAll } from "@/client-pages/hooks";
import type { FormItemComponentProps } from "@/types";

import { tableDefaultProps } from "@/utils";
import {
  apiInfoColumns,
  typeColumns,
} from "@/client-pages/pages/api/apiTableColumns";

function ApiInfoSelect({
  type,
  value,
  onChange,
}: FormItemComponentProps & { type?: string }) {
  const { data } = useApiManageAll(type);

  return (
    <div
      className={css`
        display: flex;
        height: 100%;
      `}
    >
      <Table
        {...tableDefaultProps}
        rowSelection={{
          type: "radio",
          selectedRowKeys:
            value && value.dataSourceId ? [value.dataSourceId] : [],
          onSelect: (e) => {
            onChange &&
              onChange({
                dataSourceId: e.id,
                dataSourceType: e.type,
              });
          },
        }}
        dataSource={data || []}
        scroll={{
          x: 1800,
          y: undefined,
        }}
        columns={[
          {
            title: "标识码",
            dataIndex: "id",
          },
          ...typeColumns,
          {
            title: "分组",

            dataIndex: "groupName",
          },
          ...apiInfoColumns,
        ]}
      />
    </div>
  );
}

export function ApiInfoSelectAll({ value, onChange }: FormItemComponentProps) {
  const [type, setType] = useState("all");

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "全部",
      children: <ApiInfoSelect value={value} onChange={onChange} />,
    },
    {
      key: "json",
      label: "JSON数据集",
      children: <ApiInfoSelect type="json" value={value} onChange={onChange} />,
    },
    {
      key: "js",
      label: "JS数据集",
      children: <ApiInfoSelect type="js" value={value} onChange={onChange} />,
    },
    {
      key: "http",
      label: "HTTP数据集",
      children: <ApiInfoSelect type="http" value={value} onChange={onChange} />,
    },
    {
      key: "magic",
      label: "magic-api",
      children: (
        <ApiInfoSelect type="magic" value={value} onChange={onChange} />
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="all"
      activeKey={type}
      items={items}
      onChange={setType}
    />
  );
}
