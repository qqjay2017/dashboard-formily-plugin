import type { PropsWithChildren } from "react";
import React, { Fragment } from "react";
import { observer } from "@formily/reactive-react";

export interface ITextWidgetProps extends PropsWithChildren {
  componentName?: string;
  sourceName?: string;
  token?: string;
  defaultMessage?: string;
}

/**
 * 预留多语言入口
 */

export const TextWidget: React.FC<ITextWidgetProps> = observer((props) => {
  return (
    <Fragment>{props.children || props.token || props.defaultMessage}</Fragment>
  );
});
