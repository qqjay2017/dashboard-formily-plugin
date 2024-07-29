import { observer } from "@formily/reactive-react";

import { createBehavior, createResource } from "./core";
import type { DnFC } from "./react";

export const Card: DnFC<any> = observer((props) => {
  return (
    <div
      {...props}
      style={{
        width: "100%",
        height: "100%",
        ...props.style,
        background: "#eee",
        border: "1px solid #ddd",
        display: "flex",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children ? props.children : <span>拖拽字段进入该区域</span>}
    </div>
  );
});

Card.Behavior = createBehavior({
  name: "Card",
  selector: (node) =>
    node.componentName === "Field" && node.props["x-component"] === "Card",
  designerProps: {
    droppable: false,
    resizable: {},
    translatable: {},
  },
});

Card.Resource = createResource({
  title: "卡片",
  icon: "CardSource",
  elements: [
    {
      componentName: "Field",
      props: {
        title: "输入框",
        type: "void",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          w: 3,
          h: 3,
          padding: "0px 0px 0px 0px",
        },
        "x-component": "Card",
      },
    },
  ],
  // elements: [
  //   {
  //     componentName: "Card",
  //     props: {
  //       title: "卡片",
  //     },
  //   },
  // ],
});
