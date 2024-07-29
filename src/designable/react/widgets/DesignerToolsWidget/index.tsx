import React, { Fragment, useRef } from "react";
import { Button, InputNumber } from "antd";
import { observer } from "@formily/reactive-react";
import cls from "classnames";
import { useCursor, useHistory, useScreen, useWorkbench } from "../../hooks";
import { IconWidget } from "../IconWidget";

import "./styles.less";

type DesignerToolsType = "HISTORY" | "CURSOR" | "SCREEN_TYPE";

export interface IDesignerToolsWidgetProps {
  className?: string;
  style?: React.CSSProperties;
  use?: DesignerToolsType[];
}

export const DesignerToolsWidget: React.FC<IDesignerToolsWidgetProps> =
  observer((props) => {
    const use = props.use || ["HISTORY", "CURSOR", "SCREEN_TYPE"];
    const screen = useScreen();
    const cursor = useCursor();
    const workbench = useWorkbench();
    const history = useHistory();
    const sizeRef = useRef<{ width?: any; height?: any }>({});
    const prefix = "dn-designer-tools";
    const renderHistoryController = () => {
      if (!use.includes("HISTORY")) return null;
      return (
        <Button.Group size="small" style={{ marginRight: 20 }}>
          <Button
            size="small"
            disabled={!history?.allowUndo}
            onClick={() => {
              history.undo();
            }}
          >
            <IconWidget infer="Undo" />
          </Button>
          <Button
            size="small"
            disabled={!history?.allowRedo}
            onClick={() => {
              history.redo();
            }}
          >
            <IconWidget infer="Redo" />
          </Button>
        </Button.Group>
      );
    };

    return (
      <div style={props.style} className={cls(prefix, props.className)}>
        {renderHistoryController()}
      </div>
    );
  });
