import React from "react";
import format from "dateformat";
import { observer } from "@formily/reactive-react";
import cls from "classnames";
import { get } from "lodash-es";
import { useWorkbench } from "../../hooks";
import { TextWidget } from "../TextWidget";

import "./styles.less";

const locale = {
  operations: {
    default_state: "缺省态",
    append_node: "追加节点",
    prepend_node: "头部追加",
    clone_node: "复制节点",
    update_node_props: "属性更改",
    insert_after: "后置插入",
    insert_before: "前置插入",
    insert_children: "插入子节点",
    update_children: "覆盖子节点",
    remove_node: "删除节点",
    wrap_node: "包装节点",
    from_node: "子树更新",
  },
};

export const HistoryWidget: React.FC = observer(() => {
  const workbench = useWorkbench();
  const currentWorkspace =
    workbench?.activeWorkspace || workbench?.currentWorkspace;
  const prefix = "dn-history";
  if (!currentWorkspace) return null;
  return (
    <div className={prefix}>
      {currentWorkspace.history.list().map((item, index) => {
        const type = item.type || "default_state";
        const token = type.replace(/:/g, "_");
        return (
          <div
            className={cls(`${prefix}-item`, {
              active: currentWorkspace.history.current === index,
            })}
            key={item.timestamp}
            onClick={() => {
              currentWorkspace.history.goTo(index);
            }}
          >
            <span className={`${prefix}-item-title`}>
              <TextWidget token={get(locale, `operations.${token}`)} />
            </span>
            <span className={`${prefix}-item-timestamp`}>
              {" "}
              {format(item.timestamp, "yy/mm/dd HH:MM:ss")}
            </span>
          </div>
        );
      })}
    </div>
  );
});
