import { Button, Modal, Select } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { get } from "lodash-es";
import { IoIosRefresh, IoMdAdd } from "react-icons/io";

import { observer } from "@formily/reactive-react";

import { createForm } from "@formily/core";
import { clone } from "@formily/shared";

import { Form, FormItem } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { ApiInfoSelectAll } from "./ApiInfoSelect";
import { useRequest } from "@/api-client";

import { apiBase } from "@/utils";
import CardItem from "@/schema-component/components/CardItem";

import type { FormItemComponentProps } from "@/types";
import { useInnerVisible } from "@/designable/react/hooks";

interface DataSourceBindProps extends FormItemComponentProps {}

const SchemaField = createSchemaField({
  components: {
    ApiInfoSelectAll,
    FormItem,
  },
});

const DataSourceBind = observer((props: DataSourceBindProps) => {
  const { value } = props;

  const {
    modalVisible,

    innerVisible,

    closeModal,
    openModal,
  } = useInnerVisible();

  const form = useMemo(() => {
    return createForm({
      values: {
        apiInfo: clone(props.value),
      },
    });
  }, [modalVisible, props.value, innerVisible]);

  return (
    <>
      <Button block icon={<DatabaseOutlined />} onClick={openModal}>
        {value?.dataSourceName || "配置数据源"}
      </Button>
      {modalVisible && (
        <Modal
          open={modalVisible}
          width="70%"
          onOk={() => {
            form.submit((values) => {
              props.onChange?.(values.apiInfo);
            });
            closeModal();
          }}
          onCancel={closeModal}
          title="配置数据源"
        >
          <div
            className={css`
              height: 70vh;
              overflow: hidden auto;
            `}
          >
            {innerVisible && (
              <Form form={form}>
                <SchemaField>
                  <SchemaField.Object
                    name="apiInfo"
                    x-decorator="FormItem"
                    x-component="ApiInfoSelectAll"
                  />
                </SchemaField>
              </Form>
            )}
            {/* <CardItem title="绑定API">
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
            </CardItem> */}
          </div>
        </Modal>
      )}
    </>
  );
});

export default DataSourceBind;
