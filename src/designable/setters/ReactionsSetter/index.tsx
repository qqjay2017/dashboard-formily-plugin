import React, { useEffect, useMemo, useState } from "react";
import { clone, uid } from "@formily/shared";
import { createForm, isVoidField } from "@formily/core";
import { createSchemaField } from "@formily/react";

import { Form, FormCollapse, FormItem, Input, Select } from "@formily/antd-v5";
import { Button, Card, Modal, Tag, Tooltip } from "antd";

import type { IReaction } from "./types";

import { initDeclaration } from "./declarations";
import { TextWidget, usePrefix } from "@/designable/react";

import { requestIdle } from "@/designable/shared";

import "./styles.less";
import { DepFieldSetFormItem } from "@/designable/react-settings-form";

export interface IReactionsSetterProps {
  value?: IReaction;
  onChange?: (value: IReaction) => void;
}

function TypeView({ value }) {
  const text = String(value);
  if (text.length <= 26) return <Tag>{text}</Tag>;
  return (
    <Tag>
      <Tooltip
        title={
          <div style={{ fontSize: 12 }}>
            <code>
              <pre style={{ whiteSpace: "pre-wrap", padding: 0, margin: 0 }}>
                {text}
              </pre>
            </code>
          </div>
        }
      >
        {text.substring(0, 24)}
        ...
      </Tooltip>
    </Tag>
  );
}

const SchemaField = createSchemaField({
  components: {
    Card,
    FormCollapse,
    Input,

    Select,
    FormItem,

    DepFieldSetFormItem,
  },
});

const FieldStateProperties = [
  "value",
  "initialValue",
  "inputValue",
  "inputValues",
  "modified",
  "initialized",
  "title",
  "description",
  "mounted",
  "unmounted",
  "active",
  "visited",
  "loading",
  "errors",
  "warnings",
  "successes",
  "feedbacks",
  "valid",
  "invalid",
  "pattern",
  "display",
  "disabled",
  "readOnly",
  "readPretty",
  "visible",
  "hidden",
  "editable",
  "validateStatus",
  "validating",
];

const FieldStateValueTypes = {
  modified: "boolean",
  initialized: "boolean",
  title: "string",
  description: "string",
  mounted: "boolean",
  unmounted: "boolean",
  active: "boolean",
  visited: "boolean",
  loading: "boolean",
  errors: "string[]",
  warnings: "string[]",
  successes: "string[]",
  feedbacks: `Array<
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  type?: 'error' | 'success' | 'warning'
  code?:
    | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages?: string[]
>
`,
  valid: "boolean",
  invalid: "boolean",
  pattern: "'editable' | 'disabled' | 'readOnly' | 'readPretty'",
  display: "'visible' | 'hidden' | 'none'",
  disabled: "boolean",
  readOnly: "boolean",
  readPretty: "boolean",
  visible: "boolean",
  hidden: "boolean",
  editable: "boolean",
  validateStatus: "'error' | 'warning' | 'success' | 'validating'",
  validating: "boolean",
};

export const ReactionsSetter: React.FC<IReactionsSetterProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const prefix = usePrefix("reactions-setter");
  const form = useMemo(() => {
    return createForm({
      values: clone(props.value),
    });
  }, [modalVisible, props.value]);
  const formCollapse = useMemo(
    () => FormCollapse.createFormCollapse(["deps"]),
    [modalVisible]
  );
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          initDeclaration().then(() => {
            setInnerVisible(true);
          });
        },
        {
          timeout: 400,
        }
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);

  return (
    <>
      <Button
        block
        onClick={openModal}
        disabled={props.value && Array.isArray(props.value)}
      >
        <TextWidget token="配置查询项" />
      </Button>
      <Modal
        title="配置查询项"
        width="70%"
        centered
        bodyProps={{
          style: {
            padding: 10,
          },
        }}
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={() => {
          form.submit((values) => {
            props.onChange?.(values);
          });
          closeModal();
        }}
      >
        <div className={prefix}>
          {innerVisible && (
            <Form form={form}>
              <SchemaField>
                <SchemaField.Void
                  x-component="FormCollapse"
                  x-component-props={{
                    formCollapse,
                    defaultActiveKey: ["deps", "state"],
                    style: { marginBottom: 10 },
                  }}
                >
                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      key: "deps",
                      header: "依赖字段",
                    }}
                  >
                    <SchemaField.Object
                      name="dependencies"
                      default={{}}
                      x-component="DepFieldSetFormItem"
                    ></SchemaField.Object>
                  </SchemaField.Void>
                </SchemaField.Void>
              </SchemaField>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};
