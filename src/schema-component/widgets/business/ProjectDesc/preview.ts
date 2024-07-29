import { connect } from "@formily/react";
import { ProjectDesc } from "./ProjectDesc";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyProjectDesc: DnFC<any> = connect(ProjectDesc);

FormilyProjectDesc.Resource = createResource({
  title: "项目简介",

  icon: rs("/assets/schema-component/ProjectDesc/WX20240723-152828.png"),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "ProjectDesc",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "0px 0px 0px 0px",
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
