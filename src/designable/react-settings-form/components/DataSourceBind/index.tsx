import { Button, Modal, Select } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { css } from "@emotion/css";
import { get } from "lodash-es";
import { IoIosRefresh, IoMdAdd } from "react-icons/io";

import { observer } from "@formily/reactive-react";

import { FuncText } from "./FuncText";

import { useRequest } from "@/api-client";

import { apiBase } from "@/utils";
import CardItem from "@/schema-component/components/CardItem";
import MonacoEditor from "@/schema-component/components/MonacoEditor";
import type { FormItemComponentProps } from "@/types";

interface DataSourceBindProps extends FormItemComponentProps {}

const DataSourceBind = observer((props: DataSourceBindProps) => {
  const { value } = props;
  const [open, setOpen] = useState(false);

  const { data, refetch } = useRequest(`${apiBase}/api-manage/list`, {
    method: "GET",
    enabled: open,
  });
  const dataSourceApiOptions = (get(data, "data.data", []) || []).map(
    (item) => {
      return {
        ...item,
        label: (item?.group || "") + item.name,
        value: item.id,
      };
    }
  );
  return (
    <>
      <Button
        block
        icon={<DatabaseOutlined />}
        onClick={() => {
          setOpen(true);
        }}
      >
        {value?.dataSourceName || "配置数据源"}
      </Button>
      {open && (
        <Modal
          open={open}
          width="80vw"
          onOk={() => {
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          title="配置数据源"
        >
          <div
            className={css`
              height: 70vh;
              overflow: hidden auto;
            `}
          >
            <CardItem title="绑定API">
              <Select
                value={value?.dataSourceId}
                onChange={(e, option: any) => {
                  value.dataSourceId = e;
                  value.dataSourceName = option?.label || "";
                }}
                className={css`
                  width: 400px;
                `}
                options={dataSourceApiOptions}
              />
              <Button
                icon={<IoMdAdd />}
                type="link"
                onClick={() => {
                  window.open("/dashboard/api/edit");
                }}
              />
              <Button
                icon={<IoIosRefresh />}
                type="link"
                onClick={() => {
                  refetch();
                }}
              />
            </CardItem>
            <CardItem title="请求前执行">
              <MonacoEditor
                value={value?.beforeScript || ""}
                onChange={(e) => {
                  value.beforeScript = e;
                }}
              />
            </CardItem>
            <CardItem title="请求后执行" direction="column">
              <div
                className={css`
                  width: 100%;
                  margin-bottom: 16px;
                `}
              >
                <FuncText
                  indent={10}
                  text="function afterScript ( apiRes , context) {"
                />

                <MonacoEditor
                  value={value?.afterScript || ""}
                  onChange={(e) => {
                    value.afterScript = e;
                  }}
                />
                <FuncText indent={10} text={`   }`} />
              </div>
            </CardItem>
          </div>
        </Modal>
      )}
    </>
  );
});

export default DataSourceBind;
