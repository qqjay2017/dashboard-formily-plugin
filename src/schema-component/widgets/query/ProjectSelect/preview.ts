import { connect } from "@formily/react";
import { ProjectSelect } from "./ProjectSelect";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyProjectSelect: DnFC<any> = connect(ProjectSelect);

FormilyProjectSelect.Resource = createResource({
  title: "项目选择",

  icon: rs("/assets/query/WX20240720-091304@2x.png"),

  elements: [
    {
      componentName: "Field",
      props: {
        type: "object",
        "x-component": "ProjectSelect",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "0px 0px 0px 0px",
          w: 2,
          h: 0.55,
        },

        "x-reactions": [
          "{{useAsyncProjectDataSource(projectList,firstProject)}}",
        ],
      },
    },
  ],
});
FormilyProjectSelect.Behavior = createBehavior({
  name: "ProjectSelect",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ProjectSelect",
  designerProps: {
    title: "项目选择",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema(undefined, undefined, {
      "x-reactions": undefined,
    }),
  },
});
