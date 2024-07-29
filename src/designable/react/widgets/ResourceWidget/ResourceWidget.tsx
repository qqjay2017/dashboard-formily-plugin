import React, { useState } from "react";
import { observer } from "@formily/reactive-react";
import cls from "classnames";

import { css } from "@emotion/css";
import { IconWidget } from "../IconWidget";
import { TextWidget } from "../TextWidget";
import { isResourceHost, isResourceList } from "@/designable/core";
import { isFn } from "@/designable/shared";
import type { IResource, IResourceLike } from "@/designable/core";
import "./styles.less";
import { cn } from "@/utils";

export type SourceMapper = (resource: IResource) => React.ReactChild;

export interface IResourceWidgetProps {
  title: React.ReactNode;
  sources?: IResourceLike[];
  className?: string;
  defaultExpand?: boolean;
  children?: SourceMapper | React.ReactElement;
}

export const ResourceWidget: React.FC<IResourceWidgetProps> = observer(
  ({ defaultExpand = true, ...props }) => {
    const prefix = "dn-resource";
    const [expand, setExpand] = useState(defaultExpand);
    const renderNode = (source: IResource) => {
      const { node, icon, title, thumb, span } = source;

      return (
        <div
          className={`${prefix}-item`}
          style={{ gridColumnStart: `span ${span || 1}` }}
          key={node.id}
          data-designer-source-id={node.id}
        >
          {thumb && <img className={`${prefix}-item-thumb`} src={thumb} />}
          {icon && React.isValidElement(icon) ? (
            <>{icon}</>
          ) : (
            <img
              className={cn(
                `${prefix}-item-icon`,
                css`
                  user-select: none;
                  pointer-events: none;
                `
              )}
              src={icon}
              style={{ width: 100, height: 40, objectFit: "cover" }}
            />
          )}
          <span className={`${prefix}-item-text`}>
            <TextWidget>
              {title || node.children[0]?.getMessage("title")}
            </TextWidget>
          </span>
        </div>
      );
    };
    const sources = props.sources.reduce<IResource[]>((buf, source) => {
      if (isResourceList(source)) {
        return buf.concat(source);
      } else if (isResourceHost(source)) {
        return buf.concat(source.Resource);
      }
      return buf;
    }, []);
    const remainItems =
      sources.reduce((length, source) => {
        return length + (source.span ?? 1);
      }, 0) % 3;
    return (
      <div
        className={cls(prefix, props.className, {
          expand,
        })}
      >
        <div
          className={`${prefix}-header`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setExpand(!expand);
          }}
        >
          <div className={`${prefix}-header-expand`}>
            <IconWidget infer="Expand" size={18} />
          </div>
          <div className={`${prefix}-header-content`}>
            <TextWidget>{props.title}</TextWidget>
          </div>
        </div>
        <div className={`${prefix}-content-wrapper`}>
          <div className={`${prefix}-content`}>
            {sources.map(isFn(props.children) ? props.children : renderNode)}
            {remainItems ? (
              <div
                className={`${prefix}-item-remain`}
                style={{ gridColumnStart: `span ${3 - remainItems}` }}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
