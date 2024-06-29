import { ConetentSpin } from "@/schema-component/components";
import { useDataBindFetch } from "@/schema-component/hooks";
import { DataSourceBindType } from "@/schema-component/types";
import { get } from "lodash-es";
import React from "react";
import { HeaderMenuItemType } from "./types";
import { useMenuItemStyle } from "./styles";
import { css } from "@emotion/css";

export const HeaderMenu = ({
  dataSource,
}: {
  dataSource?: DataSourceBindType;
}) => {
  const { data, isLoading } = useDataBindFetch(dataSource);
  const menuList: HeaderMenuItemType[] = get(data, "data.data", []);

  return (
    <ConetentSpin isLoading={isLoading}>
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(0.8rem, 1fr));
          gap: 0.24rem;
          justify-content: center;
        `}
      >
        {menuList.map((menuItem, index) => {
          return (
            <MenuItem
              key={menuItem.shareURL + menuItem.label + index}
              menuItem={menuItem}
            />
          );
        })}
      </div>
    </ConetentSpin>
  );
};

function MenuItem({ menuItem }: { menuItem: HeaderMenuItemType }) {
  const { styles } = useMenuItemStyle();
  if (!menuItem.children || !menuItem.children.length) {
    return <div className={styles}>{menuItem.label}</div>;
  }
  return <div>123</div>;
}
