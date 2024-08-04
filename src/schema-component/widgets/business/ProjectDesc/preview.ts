import { connect } from "@formily/react";
import { ProjectDesc } from "./ProjectDesc";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";
import mapGlobalProps from "@/schema-component/shared/mapGlobalProps";
import { getAllQueryKeys } from "@/schema-component/shared";

export const FormilyProjectDesc: DnFC<any> = connect(
  ProjectDesc,
  mapGlobalProps()
);

FormilyProjectDesc.Resource = createResource({
  title: "项目简介",

  icon: rs(
    "/dashboard-assets/schema-component/ProjectDesc/WX20240723-152828.png"
  ),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "ProjectDesc",
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
FormilyProjectDesc.Behavior = createBehavior({
  name: "ProjectDesc",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ProjectDesc",
  designerProps: {
    title: "项目简介",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
