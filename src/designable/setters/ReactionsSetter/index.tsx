import React, { useMemo } from "react";
import { clone } from "@formily/shared";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";

import { Checkbox, Form, FormItem } from "@formily/antd-v5";
import { Button, Modal, Tag, Tooltip } from "antd";

import type { IReaction } from "./types";

import { TextWidget, useInnerVisible, usePrefix } from "@/designable/react";

import "./styles.less";

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
    Checkbox,

    FormItem,
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

const ReactionsSetter: React.FC<IReactionsSetterProps> = (props) => {
  const {
    modalVisible,

    innerVisible,

    closeModal,
    openModal,
  } = useInnerVisible();

  const prefix = usePrefix("reactions-setter");
  const form = useMemo(() => {
    return createForm({
      values: {
        queryKeys: clone(props.value),
      },
    });
  }, [modalVisible, props.value]);

  return (
    <>
      <Button block onClick={openModal}>
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
            props.onChange?.(values.queryKeys);
          });
          closeModal();
        }}
      >
        <div className={prefix}>
          {innerVisible && (
            <Form form={form}>
              <SchemaField>
                <SchemaField.Array
                  name="queryKeys"
                  x-decorator="FormItem"
                  x-component="Checkbox.Group"
                  enum={[
                    {
                      label: "时间查询",
                      value: "quarterSelect",
                    },
                    {
                      label: "项目查询",
                      value: "projectSelect",
                    },
                  ]}
                />
              </SchemaField>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ReactionsSetter;
