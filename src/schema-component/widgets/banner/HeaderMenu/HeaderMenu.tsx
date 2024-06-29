import { ConetentSpin } from "@/schema-component/components";
import { useDataBindFetch, useReportId } from "@/schema-component/hooks";
import { DataSourceBindType } from "@/schema-component/types";
import { get } from "lodash-es";

import { HeaderMenuItemType } from "./types";
import { useMenuItemStyle } from "./styles";
import { css } from "@emotion/css";
import * as Select from "@radix-ui/react-select";

import { useToken } from "@/style";
import { cn } from "@/utils";
import { useReportShare } from "@/client-pages/home-list/useReportShare";

export const HeaderMenu = ({
  dataSource,
}: {
  dataSource?: DataSourceBindType;
}) => {
  const { data, isLoading } = useDataBindFetch(dataSource);
  const menuList: HeaderMenuItemType[] = get(data, "data.data", []);
  const { reportId } = useReportId();
  if (!dataSource || !dataSource.dataSourceId) {
    return (
      <div
        className={css`
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        请绑定数据源
      </div>
    );
  }
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
              reportId={reportId}
              key={menuItem.shareURL + menuItem.label + index}
              menuItem={menuItem}
            />
          );
        })}
      </div>
    </ConetentSpin>
  );
};

function MenuItem({
  menuItem,
  reportId,
}: {
  menuItem: HeaderMenuItemType;
  reportId?: string;
}) {
  const disabled = !menuItem.shareURL || menuItem.disabled;
  const active = !reportId
    ? false
    : (menuItem.shareURL && menuItem.shareURL === reportId) ||
      !!(menuItem.children || []).find((child) => child.shareURL === reportId);
  const { styles } = useMenuItemStyle({ active });
  const { token } = useToken();

  const { reportShare } = useReportShare();

  if (!menuItem.children || !menuItem.children.length) {
    return (
      <div
        onClick={() => {
          if (disabled) {
            return false;
          }
          reportShare(menuItem.shareURL, {
            isHref: true,
          });
        }}
        className={cn(
          active ? css`` : "",
          styles,

          disabled
            ? css`
                cursor: not-allowed;
              `
            : ""
        )}
      >
        {menuItem.label}
      </div>
    );
  }
  const menuItemActiveCss = css`
    background-color: ${token.popover?.accentBg}!important;
    color: ${token.popover?.accentForeground}!important;
  `;
  return (
    <Select.Root
      value={reportId}
      onValueChange={(e) => {
        if (!e) {
          return false;
        }
        reportShare(e, {
          isHref: true,
        });
      }}
    >
      <Select.Trigger asChild>
        <div className={styles}>{menuItem.label}</div>
      </Select.Trigger>

      <Select.Portal container={document.getElementById("DashboardRoot")}>
        <Select.Content
          className={css`
            margin-top: 0;
            margin-left: 0;
            overflow: hidden;
            width: 1.6rem;
            max-height: 3rem !important;
            background-color: ${token.popover?.bg};
            border-radius: 0px 0px 0px 0px;
            border: 1px solid ${token.popover?.border};
            z-index: 9999;
          `}
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport>
            {/* <SelectScrollButton>
            <ChevronUpIcon />
          </SelectScrollButton> */}
            {menuItem.children.map((subItem, index) => {
              const disabled = !subItem.shareURL || subItem.disabled;

              return (
                <Select.Item
                  disabled={disabled}
                  asChild
                  key={subItem.label + subItem.shareURL + index}
                  value={subItem.shareURL}
                  className={css`
                    outline: none;
                  `}
                >
                  <div
                    className={cn(
                      css`
                        width: 100%;
                        height: 24px;
                        line-height: 24px;
                        background-color: unset;
                        font-family: YouSheBiaoTiHei;
                        letter-spacing: 0.02rem;
                        padding-left: 0.12rem;
                        color: ${token.popover?.foreground};
                        cursor: ${disabled ? "not-allowed" : "pointer"};
                        &:hover {
                          ${!disabled && menuItemActiveCss}
                        }
                      `,
                      reportId &&
                        subItem.shareURL === reportId &&
                        menuItemActiveCss
                    )}
                  >
                    {subItem.label}
                  </div>
                </Select.Item>
              );
            })}
          </Select.Viewport>
          {/* <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton> */}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
