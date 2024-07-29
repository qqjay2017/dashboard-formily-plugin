import { connect } from "@formily/react";
import { HeaderMenu } from "./HeaderMenu";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyHeaderMenu: DnFC<any> = connect(HeaderMenu);

FormilyHeaderMenu.Resource = createResource({
  title: "头部下拉菜单",
  icon: rs("/assets/header-menu/WX20240722-153218.png"),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "HeaderMenu",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "0px 0px 0px 0px",
          w: 12,
          h: 0.75,
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
FormilyHeaderMenu.Behavior = createBehavior({
  name: "HeaderMenu",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "HeaderMenu",
  designerProps: {
    title: "头部菜单",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
