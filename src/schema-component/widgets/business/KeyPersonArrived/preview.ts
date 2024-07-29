import { connect } from "@formily/react";
import { KeyPersonArrived } from "./KeyPersonArrived";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyKeyPersonArrived: DnFC<any> = connect(KeyPersonArrived);

FormilyKeyPersonArrived.Resource = createResource({
  title: "关键人员今日到岗",

  icon: rs(
    "/assets/schema-component/KeyPersonArrived/WX20240721-143856@2x.png"
  ),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "KeyPersonArrived",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "12px 12px 12px 12px",
          w: 3,
          h: 3,
        },

        "x-reactions": {
          dependencies: {
            projectSelect: "projectSelect",
            quarterSelect: "quarterSelect",
          },
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
FormilyKeyPersonArrived.Behavior = createBehavior({
  name: "KeyPersonArrived",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "KeyPersonArrived",
  designerProps: {
    title: "关键人员今日到岗",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
