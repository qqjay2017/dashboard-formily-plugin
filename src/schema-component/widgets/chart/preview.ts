import { connect } from "@formily/react";
import { ChartTemplate } from "./ChartTemplate";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";

import { createFieldSchema } from "@/designable/Field";
import { getAllQueryKeys } from "@/schema-component/shared";

export const FormilyChartTemplate: DnFC<any> = connect(ChartTemplate);

FormilyChartTemplate.Resource = createResource({
  elements: [
    {
      componentName: "Field",

      props: {
        type: "void",
        "x-component": "ChartTemplate",
        "x-component-props": {
          queryKeys: getAllQueryKeys(),
        },

        "x-decorator": "PositionDecorator",
      },
    },
  ],
});

FormilyChartTemplate.Behavior = createBehavior({
  name: "ChartTemplate",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ChartTemplate",
  designerProps: {
    title: "通用图表模版",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
