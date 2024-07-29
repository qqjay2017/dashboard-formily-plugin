import React, { useMemo } from "react";
import { createForm } from "@formily/core";
import { Form } from "@formily/antd-v5";
import { observer } from "@formily/reactive-react";
import { requestIdle, cancelIdle } from "@/designable/shared";
import {
  usePrefix,
  useSelected,
  useOperation,
  useSelectedNode,
  useWorkbench,
  NodePathWidget,
} from "@/designable/react";
import { SchemaField } from "./SchemaField";
import { ISettingFormProps } from "./types";
import { SettingsFormContext } from "./shared/context";
import { useSnapshot } from "./effects";
import { Empty } from "antd";
import cls from "classnames";
import "./styles.less";

const GlobalState = {
  idleRequest: null,
};

export const SettingsForm: React.FC<ISettingFormProps> = observer(
  (props) => {
    const workbench = useWorkbench();
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace;
    const currentWorkspaceId = currentWorkspace?.id;
    const operation = useOperation(currentWorkspaceId);
    const node = useSelectedNode(currentWorkspaceId);
    const selected = useSelected(currentWorkspaceId);
    const prefix = usePrefix("settings-form");
    const schema = node?.designerProps?.propsSchema;
    const isEmpty = !(
      node &&
      node.designerProps?.propsSchema &&
      selected.length === 1
    );
    const form: any = useMemo(() => {
      return createForm({
        initialValues: node?.designerProps?.defaultProps,
        values: node?.props,
        effects(form) {
          useSnapshot(operation);
          props.effects?.(form);
        },
      });
    }, [node, node?.props, schema, operation, isEmpty]);

    const render = () => {
      if (!isEmpty) {
        return (
          <div
            className={cls(prefix, props.className)}
            style={props.style}
            key={node.id}
          >
            <SettingsFormContext.Provider value={props}>
              <Form
                form={form}
                colon={false}
                labelWidth={120}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
              >
                <SchemaField
                  schema={schema}
                  components={props.components}
                  scope={{ $node: node, ...props.scope }}
                />
              </Form>
            </SettingsFormContext.Provider>
          </div>
        );
      }
      return (
        <div className={prefix + "-empty"}>
          <Empty />
        </div>
      );
    };

    return (
      <div className={prefix + "-wrapper"}>
        {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}
        <div className={prefix + "-content"}>{render()}</div>
      </div>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  }
);
