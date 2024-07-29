import React from "react";
import { observer } from "@formily/reactive-react";
import { get } from "lodash-es";
import { GlobalRegistry, type TreeNode } from "@/designable/core";
import { useSchemaOptionsContext } from "@/schema-component";

export interface INodeTitleWidgetProps {
  node: TreeNode;
}

export const NodeTitleWidget: React.FC<INodeTitleWidgetProps> = observer(
  (props) => {
    const takeNode = () => {
      const node = props.node;
      if (node.componentName === "$$ResourceNode$$") {
        return node.children[0];
      }
      return node;
    };
    const node = takeNode();

    const { scope } = useSchemaOptionsContext();

    const title = get(node, "designerProps.title");
    const isChartTemplate = get(node, "props.x-component") === "ChartTemplate";
    const chartTemplateId = get(node, "props.x-component-props.chartId");

    return (
      <>
        {isChartTemplate
          ? get(scope, `chartIdMap.${chartTemplateId}.name`)
          : title || node.componentName || "componentName"}
      </>
    );
  }
);
