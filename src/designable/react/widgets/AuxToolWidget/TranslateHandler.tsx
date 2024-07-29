import React from "react";
import cls from "classnames";
import { injectGlobal } from "@emotion/css";
import { RiDragDropFill } from "react-icons/ri";
import { get } from "lodash-es";
import { useDesigner } from "../../hooks";

import type { TreeNode } from "@/designable/core";

injectGlobal`
.aux-node-translate-handler {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 40px;
  height: 20px;
  background: #1890ff;
  opacity: 0.5;
  pointer-events: all;
}
`;

export interface ITranslateHandlerProps {
  node: TreeNode;
}

export const TranslateHandler: React.FC<ITranslateHandlerProps> = (props) => {
  const designer = useDesigner();
  const prefix = "aux-node-translate-handler";
  const createHandler = (value: string) => {
    return {
      [designer.props.nodeTranslateAttrName]: value,
      className: cls(prefix, value),
    };
  };
  const allowTranslate = props.node.allowTranslate();
  const nodeW = get(props.node, "props.x-decorator-props.w", 0);
  if (nodeW < 2.5) {
    return null;
  }
  if (!allowTranslate) return null;
  return (
    <div {...createHandler("translate")}>
      <svg
        viewBox="0 0 1024 1024"
        style={{
          pointerEvents: "none",
          width: 20,
          height: 20,
        }}
      >
        <path
          d="M469.333333 938.666667c-17.066667 0-29.866667-8.533333-42.666666-17.066667l-209.066667-179.2 29.866667-34.133333c8.533333-8.533333 21.333333-12.8 29.866666-12.8h8.533334L426.666667 768V341.333333c0-25.6 17.066667-42.666667 42.666666-42.666666s42.666667 17.066667 42.666667 42.666666v192l51.2 4.266667 209.066667 93.866667c21.333333 8.533333 38.4 34.133333 38.4 55.466666v187.733334c0 34.133333-29.866667 64-64 64H469.333333z m128-640V42.666667l128 128-128 128z m0-85.333334H341.333333v85.333334L213.333333 170.666667l128-128v85.333333h256v85.333333z"
          p-id="13294"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
  );
};
