import { connect } from "@formily/react";
import { Header1 } from "./header1";
import { createBehavior, createResource } from "@/designable/core";
import type { DnFC } from "@/designable/react";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyHeader1: DnFC<any> = connect(Header1);

FormilyHeader1.Resource = createResource({
  title: "头部1",
  icon: rs("/assets/schema-component/Header1/WX20240728-001724@2x.png"),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",

        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          w: 12,
          h: 1.3,
          padding: [0, 0, 0, 0],
        },
        "x-component": "Header1",
        "x-component-props": {
          title: "{{dashboardDt.name}}",
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

FormilyHeader1.Behavior = createBehavior({
  name: "Header1",
  selector: (node) =>
    node.componentName === "Field" && node.props["x-component"] === "Header1",
  designerProps: {
    title: "头部1",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
