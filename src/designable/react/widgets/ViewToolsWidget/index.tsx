import React from "react";
import { Button } from "antd";
import { observer } from "@formily/reactive-react";
import cls from "classnames";

import { usePrefix, useWorkbench } from "../../hooks";

import IconWidget from "../IconWidget";
import type { WorkbenchTypes } from "@/designable/core";

export interface IViewToolsWidget {
  use?: WorkbenchTypes[];
  style?: React.CSSProperties;
  className?: string;
}

const ViewToolsWidget: React.FC<IViewToolsWidget> = observer(
  ({ use = ["DESIGNABLE", "JSONTREE", "PREVIEW"], style, className }) => {
    const workbench = useWorkbench();
    const prefix = usePrefix("view-tools");
    return (
      <Button.Group style={style} className={cls(prefix, className)}>
        {use.includes("DESIGNABLE") && (
          <Button
            disabled={workbench.type === "DESIGNABLE"}
            onClick={() => {
              workbench.type = "DESIGNABLE";
            }}
            size="small"
          >
            <IconWidget infer="HTML" />
          </Button>
        )}
        {use.includes("JSONTREE") && (
          <Button
            disabled={workbench.type === "JSONTREE"}
            onClick={() => {
              workbench.type = "JSONTREE";
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
          </Button>
        )}
        {use.includes("MARKUP") && (
          <Button
            disabled={workbench.type === "MARKUP"}
            onClick={() => {
              workbench.type = "MARKUP";
            }}
            size="small"
          >
            <IconWidget infer="Code" />
          </Button>
        )}
        {use.includes("PREVIEW") && (
          <Button
            disabled={workbench.type === "PREVIEW"}
            onClick={() => {
              workbench.type = "PREVIEW";
            }}
            size="small"
          >
            <IconWidget infer="Play" />
          </Button>
        )}
      </Button.Group>
    );
  }
);

export default ViewToolsWidget;
