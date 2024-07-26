import React, { Fragment, useEffect } from "react";
import { observer } from "@formily/reactive-react";
import cls from "classnames";
import { css } from "@emotion/css";
import { useComponents, useDesigner, useTree } from "../../hooks";
import { DesignerComponentsContext, TreeNodeContext } from "../../context";
import type { IDesignerComponents } from "../../types";
import { GlobalRegistry } from "@/designable/core";
import type { TreeNode } from "@/designable/core";

export interface IComponentTreeWidgetProps {
  style?: React.CSSProperties;
  className?: string;
  components: IDesignerComponents;
}

export interface ITreeNodeWidgetProps {
  node: TreeNode;
  children?: React.ReactChild;
}

export const TreeNodeWidget: React.FC<ITreeNodeWidgetProps> = observer(
  (props: ITreeNodeWidgetProps) => {
    const designer = useDesigner(props.node?.designerProps?.effects);
    const components = useComponents();
    const node = props.node;
    const renderChildren = () => {
      if (node?.designerProps?.selfRenderChildren) return [];
      return node?.children?.map((child) => {
        return <TreeNodeWidget key={child.id} node={child} />;
      });
    };
    const renderProps = (extendsProps: any = {}) => {
      const props = {
        ...node.designerProps?.defaultProps,
        ...extendsProps,
        ...node.props,
        ...node.designerProps?.getComponentProps?.(node),
      };
      if (node.depth === 0) {
        delete props.style;
      }
      return props;
    };
    const renderComponent = () => {
      const componentName = node.componentName;
      const Component = components[componentName];
      const dataId = {};
      if (Component) {
        if (designer) {
          dataId[designer?.props?.nodeIdAttrName] = node.id;
        }
        return React.createElement(
          Component,
          renderProps(dataId),
          ...renderChildren()
        );
      } else {
        if (node?.children?.length) {
          return <Fragment>{renderChildren()}</Fragment>;
        }
      }
    };

    if (!node) return null;
    if (node.hidden) return null;
    return React.createElement(
      TreeNodeContext.Provider,
      { value: node },
      renderComponent()
    );
  }
);

export const ComponentTreeWidget: React.FC<IComponentTreeWidgetProps> =
  observer((props: IComponentTreeWidgetProps) => {
    const tree = useTree();

    const designer = useDesigner();
    const dataId = {};
    if (designer && tree) {
      // data-designer-node-id
      dataId[designer?.props?.nodeIdAttrName] = tree.id;
    }
    useEffect(() => {
      GlobalRegistry.registerDesignerBehaviors(props.components);
    }, []);
    return (
      <div
        style={{ ...props.style, ...tree?.props?.style }}
        className={css`
          min-height: 100%;
          min-width: 100%;
        `}
        {...dataId}
      >
        <DesignerComponentsContext.Provider value={props.components}>
          <TreeNodeWidget node={tree} />
        </DesignerComponentsContext.Provider>
      </div>
    );
  });

ComponentTreeWidget.displayName = "ComponentTreeWidget";
