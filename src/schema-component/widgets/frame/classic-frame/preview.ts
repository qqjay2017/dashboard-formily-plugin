import { connect } from "@formily/react";
import { ClassicFrame } from "./ClassicFrame";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/schema-component/core";

export const FormilyClassicFrame: DnFC<any> = connect(ClassicFrame);

FormilyClassicFrame.Resource = createResource({
  title: "基础边框",

  icon: rs(
    "/dashboard-assets/schema-component/ClassicFrame/WX20240720-173009@2x.png"
  ),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "ClassicFrame",
        "x-component-props": {
          title: "默认标题",
          headerH: 0.5111,
        },
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "0px 0px 0px 0px",
          w: 3,
          h: 3,
        },
      },
    },
  ],
});
FormilyClassicFrame.Behavior = createBehavior({
  name: "ClassicFrame",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ClassicFrame",
  designerProps: {
    title: "基础边框",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({
      title: {
        type: "string",
        title: "标题",
        "x-decorator": "FormItem",
        "x-component": "Input",
      },
      subTitle: {
        type: "string",
        title: "副标题",
        "x-decorator": "FormItem",
        "x-component": "Input",
      },
    }),
  },
});
