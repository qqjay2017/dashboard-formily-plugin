import { connect } from "@formily/react";
import { Header5 } from "./Header5";
import { createBehavior, createResource } from "@/designable/core";
import type { DnFC } from "@/designable/react";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyHeader5: DnFC<any> = connect(Header5);

FormilyHeader5.Resource = createResource({
  title: "头部5",
  icon: rs("/assets/schema-component/header5/WX20240719-232752@2x.png"),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "string",
        "x-decorator": "PositionDecorator",
        "x-component": "Header5",
        "x-component-props": {
          title: "{{dashboardDt.name}}",
        },
        "x-decorator-props": {
          w: 12,
          h: 1.3,
          padding: "0px 0px 0px 0px",
        },
        "x-reactions": {
          dependencies: {},
          when: true,
          fulfill: {
            schema: {
              "x-component-props.query": "{{$deps}}",
            },
          },
        },
      },
    },
  ],
});

FormilyHeader5.Behavior = createBehavior({
  name: "Header5",
  selector: (node) =>
    node.componentName === "Field" && node.props["x-component"] === "Header5",
  designerProps: {
    title: "头部5",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    defaultProps: {},
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
        required: false,
        "x-decorator": "FormItem",
        "x-component": "Input",
      },
    }),
  },
});
