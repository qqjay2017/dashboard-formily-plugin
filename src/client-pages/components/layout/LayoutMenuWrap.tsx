import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { css, cx } from "@emotion/css";
import ToggleMenuCollBtn from "../ToggleMenuCollBtn";
import { usePageLayoutContext } from "../PageLayout/usePageLayoutContext";
import { sideMenuWrapStyle } from "@/designable/styles";

interface ILayoutMenuWrapProps extends MenuProps {}

export default function LayoutMenuWrap(props: ILayoutMenuWrapProps) {
  const { menuCollapsed, siderWidth } = usePageLayoutContext();

  return (
    <div
      className={cx(
        sideMenuWrapStyle,

        css`
          flex: 0 0 ${siderWidth}px;
          max-width: ${siderWidth}px;
          min-width: ${siderWidth}px;
          width: ${siderWidth}px;
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
