import { connect } from "@formily/react";
import { LaborAttendance } from "./LaborAttendance";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyLaborAttendance: DnFC<any> = connect(LaborAttendance);

FormilyLaborAttendance.Resource = createResource({
  title: "劳务出勤情况",
  icon: rs(
    "/dashboard-assets/schema-component/LaborAttendance/WX20240723-235828@2x.png"
  ),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "LaborAttendance",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          disOffsetHeaderSize: true,
          padding: "0px 0px 0px 0px",
          w: 3,
          h: 3,
        },
      },
    },
  ],
});
FormilyLaborAttendance.Behavior = createBehavior({
  name: "LaborAttendance",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "LaborAttendance",
  designerProps: {
    title: "劳务出勤情况",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
