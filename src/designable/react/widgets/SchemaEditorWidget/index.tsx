import { css } from "@emotion/css";
import { useState } from "react";
import { IconWidget } from "../IconWidget";
import type { ITreeNode, TreeNode } from "@/designable/core";
import { transformToTreeNode } from "@/designable/core";
import { transformToSchema } from "@/designable/Field";
import { MonacoEditor } from "@/schema-component";
import { cn } from "@/utils";

export interface ISchemaEditorWidgetProps {
  tree: TreeNode;
  onChange?: (tree: ITreeNode) => void;
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  const [value, onChange] = useState(
    JSON.stringify(transformToSchema(props.tree), null, 2)
  );
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
      <div
        onClick={() => {
          try {
            props?.onChange?.(transformToTreeNode(JSON.parse(value)));
          } catch (error) {
            console.error(error, "保存json失败");
          }
        }}
        className={cn(
          "ant-btn-primary",
          css`
            color: #fff;
            background: #1668dc;
            box-shadow: 0 2px 0 rgba(0, 60, 180, 0.15);
            cursor: pointer;
            pointer-events: all;
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 999;
            border-radius: 50%;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
          `
        )}
      >
        <IconWidget infer="Save" size={20} />
      </div>
      <MonacoEditor
        {...props}
        value={value}
        onChange={(value) => {
          onChange(value);
          // props.onChange?.(transformToTreeNode(JSON.parse(value)));
        }}
        language="json"
        theme="vs-dark"
        height="100%"
      />
    </div>
  );
};
