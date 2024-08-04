import { connect } from "@formily/react";
import { AiotMonitorBlock } from "./AiotMonitorBlock";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyAiotMonitorBlock: DnFC<any> = connect(AiotMonitorBlock);

FormilyAiotMonitorBlock.Resource = createResource({
  title: "AIOT监控",

  icon: rs(
    "/dashboard-assets/schema-component/AiotMonitorBlock/WX20240724-165947.png"
  ),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "AiotMonitorBlock",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          disOffsetHeaderSize: true,
          padding: "0px 0px 0px 0px",
          w: 3,
          h: 3,
        },
      },
    },
  ],
});
FormilyAiotMonitorBlock.Behavior = createBehavior({
  name: "AiotMonitorBlock",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "AiotMonitorBlock",
  designerProps: {
    title: "AIOT监控",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
