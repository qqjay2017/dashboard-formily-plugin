import { connect } from "@formily/react";

import DeviationOfCargo from ".";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { getAllQueryKeys } from "@/schema-component/shared";
import { createFieldSchema } from "@/designable/Field";
import { rs } from "@/utils";

export const FormilyDeviationOfCargo: DnFC<any> = connect(DeviationOfCargo);

FormilyDeviationOfCargo.Resource = createResource({
  title: "地磅-各货物偏差情况",

  icon: rs(
    "/dashboard-assets/schema-component/deviation-of-cargo/WX20240720-173009@2x.png"
  ),
  elements: [
    {
      componentName: "Field",

      props: {
        type: "void",
        "x-component": "DeviationOfCargo",
        "x-component-props": {
          queryKeys: getAllQueryKeys(),
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

FormilyDeviationOfCargo.Behavior = createBehavior({
  name: "DeviationOfCargo",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "DeviationOfCargo",
  designerProps: {
    title: "地磅-各货物偏差情况",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
