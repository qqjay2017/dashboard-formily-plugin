import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { css, cx } from "@emotion/css";
import ToggleMenuCollBtn from "../ToggleMenuCollBtn";
import { usePageLayoutContext } from "../PageLayout/usePageLayoutContext";
import { sideMenuWrapStyle } from "@/designable/styles";

interface ILayoutMenuWrapProps extends MenuProps {}

export default function LayoutMenuWrap(props: ILayoutMenuWrapProps) {
  const { menuCollapsed } = usePageLayoutContext();

  const size = menuCollapsed ? "80" : "200";
  return (
    <div
      className={cx(
        sideMenuWrapStyle,

        css`
          flex: 0 0 ${size}px;
          max-width: ${size}px;
          min-width: ${size}px;
          width: ${size}px;
        `
      )}
      style={{
        width: menuCollapsed ? 80 : 200,
      }}
    >
      <ToggleMenuCollBtn />
      <Menu inlineCollapsed={menuCollapsed} mode="inline" {...props} />
    </div>
  );
}
