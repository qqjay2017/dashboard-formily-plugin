import type { PropsWithChildren } from "react";
import React, { Fragment, useMemo, useRef } from "react";
import type { IFormItemProps } from "@formily/antd-v5";
import { FormItem } from "@formily/antd-v5";
import { observer, useField } from "@formily/react";
import { observable } from "@formily/reactive";
import cls from "classnames";
import { IconWidget, usePrefix } from "@/designable/react";
import "./styles.less";

const ExpandedMap = new Map<string, boolean>();

export const FoldItem: React.FC<PropsWithChildren<IFormItemProps>> & {
  Base?: React.FC<PropsWithChildren>;
  Extra?: React.FC<PropsWithChildren>;
} = observer(({ className, style, children, ...props }) => {
  const prefix = usePrefix("fold-item");
  const field = useField();
  const expand = useMemo(
    () => observable.ref(ExpandedMap.get(field.address.toString())),
    []
  );
  const slots = useRef({ base: null, extra: null });
  React.Children.forEach(children, (node) => {
    if (React.isValidElement(node)) {
      if ((node?.type as any)?.displayName === "FoldItem.Base") {
        slots.current.base = node.props.children;
      }
      if ((node?.type as any)?.displayName === "FoldItem.Extra") {
        slots.current.extra = node.props.children;
      }
    }
  });
  return (
    <div className={cls(prefix, className)}>
      <div
        className={`${prefix}-base`}
        onClick={() => {
          expand.value = !expand.value;
          ExpandedMap.set(field.address.toString(), expand.value);
        }}
      >
        <FormItem.BaseItem
          {...props}
          label={
            <span
              className={cls(`${prefix}-title`, {
                expand: expand.value,
              })}
            >
              {slots.current.extra && <IconWidget infer="Expand" size={10} />}
              {props.label}
            </span>
          }
        >
          <div
            style={{ width: "100%" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {slots.current.base}
          </div>
        </FormItem.BaseItem>
      </div>
      {expand.value && slots.current.extra && (
        <div className={`${prefix}-extra`}>{slots.current.extra}</div>
      )}
    </div>
  );
});

const Base: React.FC = () => {
  return <Fragment />;
};

Base.displayName = "FoldItem.Base";

const Extra: React.FC = () => {
  return <Fragment />;
};

Extra.displayName = "FoldItem.Extra";

FoldItem.Base = Base;
FoldItem.Extra = Extra;
