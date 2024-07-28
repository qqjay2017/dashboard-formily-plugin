import { observer } from "@formily/reactive-react";
import { Tooltip, type TooltipProps } from "antd";
import React from "react";
import { CgComponents, CgDisplayFlex, CgDisplaySpacing } from "react-icons/cg";
import {
  MdOutlineClearAll,
  MdOutlineClose,
  MdOutlineExpandMore,
  MdOutlineFindInPage,
  MdOutlineHistory,
  MdOutlineVerticalAlignBottom,
  MdOutlineVerticalAlignTop,
  MdRemoveRedEye,
} from "react-icons/md";
import { TbBrandGoogleBigQuery } from "react-icons/tb";
import { PiMapPinLineLight, PiPathLight } from "react-icons/pi";
import {
  RiContractLeftLine,
  RiContractRightLine,
  RiDragDropLine,
  RiEyeCloseLine,
  RiLinkedinLine,
} from "react-icons/ri";

import { IoIosSettings } from "react-icons/io";

import { cn } from "@/utils";

export interface IIconWidgetProps extends React.HTMLAttributes<HTMLElement> {
  tooltip?: TooltipProps;
  infer: React.ReactNode | string;
  size?: number | string;
}

export interface IShadowSVGProps {
  content?: string;
  width?: number | string;
  height?: number | string;
}

const allIconMap = {
  Component: CgComponents,
  Close: MdOutlineClose,
  Outline: MdOutlineClearAll,
  Expand: MdOutlineExpandMore,
  Page: MdOutlineFindInPage,
  History: MdOutlineHistory,
  Eye: MdRemoveRedEye,
  EyeClose: RiEyeCloseLine,
  Position: PiMapPinLineLight,
  Setting: IoIosSettings,
  DragDrop: RiDragDropLine,
  TbBrandGoogleBigQuery,
  DisplayBlock: RiLinkedinLine,
  DisplayFlex: CgDisplayFlex,
  DisplayInline: CgDisplaySpacing,
  DisplayInlineBlock: CgDisplaySpacing,
  Top: MdOutlineVerticalAlignTop,
  Bottom: MdOutlineVerticalAlignBottom,
  Left: RiContractLeftLine,
  Right: RiContractRightLine,
};

export const IconWidget = observer(
  ({
    infer,
    className,
    style,
    size = 20,
    tooltip,
    title,
    ...props
  }: IIconWidgetProps) => {
    const renderTooltips = (
      children: React.ReactElement
    ): React.ReactElement => {
      if (tooltip && title) {
        return (
          <Tooltip {...tooltip} title={title}>
            {children}
          </Tooltip>
        );
      }
      return children;
    };

    if (typeof infer === "string") {
      const Com = allIconMap[infer];
      if (Com) {
        return renderTooltips(
          React.createElement(Com, {
            ...props,
            className: cn(className, "iconWidget", `iconWidget-${infer}`),
            style: {
              // color: "var(--dn-composite-panel-tabs-color)",
              ...style,
              fontSize: size,
              width: size,
              height: size,
            },
          })
        );
      } else {
        console.log(infer);
      }
    }
    return infer || null;
  }
);
