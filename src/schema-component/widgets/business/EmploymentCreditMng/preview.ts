import { connect } from "@formily/react";
import { EmploymentCreditMng } from "./EmploymentCreditMng";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyEmploymentCreditMng: DnFC<any> =
  connect(EmploymentCreditMng);

FormilyEmploymentCreditMng.Resource = createResource({
  title: "用工信用管理",

  icon: rs(
    "/dashboard-assets/schema-component/EmploymentCreditMng/WX20240721-162339@2x.png"
  ),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "EmploymentCreditMng",
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
FormilyEmploymentCreditMng.Behavior = createBehavior({
  name: "EmploymentCreditMng",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "EmploymentCreditMng",
  designerProps: {
    title: "用工信用管理",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
