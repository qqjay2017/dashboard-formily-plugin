import { Dropdown } from "antd";
import {
  SchemaSettingsIcon,
  SchemaSettingsProvider,
} from "../../../schema-settings";
import { useSchemaComponentContext } from "../../hooks";
import { ItemType } from "antd/es/menu/interface";
import { css } from "@emotion/css";
import { useState } from "react";

const InternalDashboardSettings = () => {
  const [visible, setVisible] = useState(false);
  const items: ItemType[] = [
    {
      key: "theme",
      label: "主题风格",
      title: "主题风格",
    },
  ];
  return (
    <div
      className={css`
        position: absolute;
        right: 16px;
        top: 16px;
        z-index: 99999;
      `}
    >
      <SchemaSettingsProvider>
        <Dropdown
          open={visible}
          trigger={["click", "hover"]}
          onOpenChange={(e) => {
            setVisible(e);
          }}
          placement="bottomRight"
          //   getPopupContainer={() => document.getElementById("DashboardRoot")}
          menu={{
            items,
          }}
        >
          <SchemaSettingsIcon
            onClick={(e) => {
              setVisible(true);
            }}
          />
        </Dropdown>
      </SchemaSettingsProvider>
    </div>
  );
};

export const DashboardSettings = () => {
  const { designable } = useSchemaComponentContext();
  if (!designable) {
    return null;
  }
  return <InternalDashboardSettings />;
};
