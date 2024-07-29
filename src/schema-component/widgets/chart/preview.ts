import { connect } from "@formily/react";
import { ChartTemplate } from "./ChartTemplate";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
// import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyChartTemplate: DnFC<any> = connect(ChartTemplate);

// FormilyChartTemplate.Resource = createResource({
//   title: "通用图表模版",

//   icon: rs("/assets/schema-component/ChartTemplate/WX20240723-152828.png"),
//   elements: [
//     {
//       componentName: "Field",
//       props: {
//         type: "void",
//         "x-component": "ChartTemplate",
//         "x-decorator": "PositionDecorator",
//         "x-decorator-props": {
//           padding: "4px 4px 4px 4px",
//           w: 3,
//           h: 3,
//         },

//         "x-reactions": {
//           dependencies: {
//             projectSelect: "projectSelect",
//             quarterSelect: "quarterSelect",
//           },
//           when: true,
//           fulfill: {
//             schema: {
//               "x-component-props.query": "{{$deps}}",
//             },
//           },
//         },
//       },
//     },
//   ],
// });
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
