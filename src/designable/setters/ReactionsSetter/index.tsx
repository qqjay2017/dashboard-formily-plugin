import React, { useEffect, useMemo, useState } from "react";
import { clone, uid } from "@formily/shared";
import { createForm, isVoidField } from "@formily/core";
import { createSchemaField } from "@formily/react";

import {
  ArrayTable,
  Form,
  FormCollapse,
  FormItem,
  Input,
  Select,
} from "@formily/antd-v5";
import { Button, Card, Modal, Tag, Tooltip } from "antd";
import { PathSelector } from "./PathSelector";
import { FieldPropertySetter } from "./FieldPropertySetter";
import { FulfillRunHelper } from "./helpers";
import type { IReaction } from "./types";

import { TextWidget, usePrefix } from "@/designable/react";
import { requestIdle } from "@/designable/shared";
import { GlobalRegistry } from "@/designable/core";
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
    Card,
    FormCollapse,
    Input,
    TypeView,
    Select,
    FormItem,
    PathSelector,
    FieldPropertySetter,
    ArrayTable,
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
    () => FormCollapse.createFormCollapse(["deps", "state"]),
    [modalVisible]
  );
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />
      </Button>
      <Modal
        title="SettingComponents.ReactionsSetter.configureReactions"
        width="70%"
        centered
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        visible={modalVisible}
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
                      header:
                        "SettingComponents.ReactionsSetter.relationsFields",
                    }}
                  >
                    <SchemaField.Array
                      name="dependencies"
                      default={[{}]}
                      x-component="ArrayTable"
                    >
                      <SchemaField.Object>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title:
                              "SettingComponents.ReactionsSetter.sourceField",
                            width: 240,
                          }}
                        >
                          <SchemaField.String
                            name="source"
                            x-decorator="FormItem"
                            x-component="PathSelector"
                            x-component-props={{
                              placeholder:
                                "SettingComponents.ReactionsSetter.pleaseSelect",
                            }}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title:
                              "SettingComponents.ReactionsSetter.sourceProperty",
                            width: 200,
                          }}
                        >
                          <SchemaField.String
                            name="property"
                            default="value"
                            x-decorator="FormItem"
                            x-component="Select"
                            x-component-props={{ showSearch: true }}
                            enum={FieldStateProperties}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title:
                              "SettingComponents.ReactionsSetter.variableName",
                            width: 200,
                          }}
                        >
                          <SchemaField.String
                            name="name"
                            x-decorator="FormItem"
                            x-validator={{
                              pattern: /^[$_a-z][$\w]*$/i,
                              message:
                                "SettingComponents.ReactionsSetter.variableNameValidateMessage",
                            }}
                            x-component="Input"
                            x-component-props={{
                              addonBefore: "$deps.",
                              placeholder:
                                "SettingComponents.ReactionsSetter.pleaseInput",
                            }}
                            x-reactions={(field) => {
                              if (isVoidField(field)) return;
                              field.query(".source").take((source) => {
                                if (isVoidField(source)) return;
                                if (
                                  source.value &&
                                  !field.value &&
                                  !field.modified
                                ) {
                                  field.value =
                                    source.inputValues[1]?.props?.name ||
                                    `v_${uid()}`;
                                }
                              });
                            }}
                          />
                        </SchemaField.Void>

                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title:
                              "SettingComponents.ReactionsSetter.variableType",
                            ellipsis: {
                              showTitle: false,
                            },
                            width: 200,
                            align: "center",
                          }}
                        >
                          <SchemaField.String
                            name="type"
                            default="any"
                            x-decorator="FormItem"
                            x-component="TypeView"
                            x-reactions={(field) => {
                              if (isVoidField(field)) return;
                              const property = field
                                .query(".property")
                                .get("inputValues");
                              if (!property) return;
                              property[0] = property[0] || "value";
                              field.query(".source").take((source) => {
                                if (isVoidField(source)) return;
                                if (source.value) {
                                  if (
                                    property[0] === "value" ||
                                    property[0] === "initialValue" ||
                                    property[0] === "inputValue"
                                  ) {
                                    field.value =
                                      source.inputValues[1]?.props?.type ||
                                      "any";
                                  } else if (property[0] === "inputValues") {
                                    field.value = `any[]`;
                                  } else if (property[0]) {
                                    field.value =
                                      FieldStateValueTypes[property[0]];
                                  } else {
                                    field.value = "any";
                                  }
                                }
                              });
                            }}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title:
                              "SettingComponents.ReactionsSetter.operations",
                            align: "center",
                            width: 80,
                          }}
                        >
                          <SchemaField.Markup
                            type="void"
                            x-component="ArrayTable.Remove"
                          />
                        </SchemaField.Void>
                      </SchemaField.Object>
                      <SchemaField.Void
                        title="SettingComponents.ReactionsSetter.addRelationField"
                        x-component="ArrayTable.Addition"
                        x-component-props={{ style: { marginTop: 8 } }}
                      />
                    </SchemaField.Array>
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      header:
                        "SettingComponents.ReactionsSetter.propertyReactions",
                      key: "state",
                      className: "reaction-state",
                    }}
                  >
                    <SchemaField.Markup
                      name="fulfill.state"
                      x-component="FieldPropertySetter"
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      key: "run",
                      header:
                        "SettingComponents.ReactionsSetter.actionReactions",
                      className: "reaction-runner",
                    }}
                  >
                    <SchemaField.String
                      name="fulfill.run"
                      x-component="MonacoInput"
                      x-component-props={{
                        width: "100%",
                        height: 400,
                        language: "typescript",
                        helpCode: FulfillRunHelper,
                        options: {
                          minimap: {
                            enabled: false,
                          },
                        },
                      }}
                      x-reactions={(field) => {
                        const deps = field.query("dependencies").value();
                        if (Array.isArray(deps)) {
                          field.componentProps.extraLib = `
                          declare var $deps : {
                            ${deps.map(({ name, type }) => {
                              if (!name) return "";
                              return `${name}?:${type || "any"},`;
                            })}
                          }
                          `;
                        }
                      }}
                    />
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