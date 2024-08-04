import { connect } from "@formily/react";
import { ClassicFrame5 } from "./ClassicFrame5";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyClassicFrame5: DnFC<any> = connect(ClassicFrame5);

FormilyClassicFrame5.Resource = createResource({
  title: "边框5",
  icon: rs(
    "/dashboard-assets/schema-component/ClassicFrame5/Frame321315077.png"
  ),

  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "ClassicFrame5",
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
FormilyClassicFrame5.Behavior = createBehavior({
  name: "ClassicFrame5",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ClassicFrame5",
  designerProps: {
    title: "边框5",
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
