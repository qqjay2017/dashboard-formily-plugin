import { MenuOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import React, { FC, useMemo } from "react";

// import { SchemaSettingOptions } from "../types";

export interface SchemaSettingsIconProps extends AntdIconProps {
  // options: SchemaSettingOptions;
}

export const SchemaSettingsIcon: FC<SchemaSettingsIconProps> = React.memo(
  ({ onClick }) => {
    const style = useMemo(() => ({ cursor: "pointer", fontSize: 12 }), []);
    return <MenuOutlined role="button" style={style} onClick={onClick} />;
  }
);
SchemaSettingsIcon.displayName = "SchemaSettingsIcon";
