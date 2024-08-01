import { get } from "lodash-es";
import { css } from "@emotion/css";
import * as Select from "@radix-ui/react-select";
import useResizeObserver from "use-resize-observer";
import { forwardRef, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type { HeaderMenuItemType } from "./types";
import { useMenuItemStyle } from "./styles";

import { useDataBindFetch, useReportId } from "@/schema-component/hooks";

import { useToken } from "@/schema-component/antd/style";
import { cn, sizeFormat } from "@/utils";
import { useReportShare } from "@/application/hooks";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/dashboard-themes/ui";

import type { SchemComponentWithDataSourceProps } from "@/types";

import { takeFirstApiInfo } from "@/schema-component/shared";
import { EmptyKit } from "@/dashboard-themes/style-components";

const emptyCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = forwardRef<
  HTMLDivElement,
  {
    menuItem: HeaderMenuItemType;
    reportId?: string;
    className?: string;
    style?: React.CSSProperties;
  }
>(({ menuItem, reportId, className, style }, ref) => {
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
        ref={ref}
        role="group"
        aria-roledescription="slide"
        onClick={() => {
          if (disabled) {
            return false;
          }
          reportShare(menuItem.shareURL, {
            isHref: true,
          });
        }}
        className={cn(
          // active ? css`` : "",
          styles,

          disabled
            ? css`
                cursor: not-allowed;
              `
            : "",
          className
        )}
        style={style}
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
        <div
          role="group"
          aria-roledescription="slide"
          className={cn(styles, className)}
          style={style}
        >
          {menuItem.label}
        </div>
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
                        height: 0.38rem;
                        line-height: 0.38rem;
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
});
export function HeaderMenu({ apiInfo }: SchemComponentWithDataSourceProps) {
  const { data, isLoading } = useDataBindFetch(apiInfo);
  const menuList: HeaderMenuItemType[] = get(data, "data.data", []) || [];
  const { reportId } = useReportId();
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
  const menuInnerWidth = useMemo(() => {
    if (!width) return 0;

    return Math.floor(width - 60);
  }, [width]);

  const menuCount = useMemo(() => {
    if (!menuInnerWidth) return 0;

    return Math.floor(menuInnerWidth / 180);
  }, [menuInnerWidth]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const firstApiInfo = takeFirstApiInfo(apiInfo);

  if (!firstApiInfo || !firstApiInfo.dataSourceId) {
    return <div className={emptyCss}>请绑定数据源</div>;
  }
  if (!isLoading && !menuList.length) {
    return <div className={emptyCss}>菜单数据为空</div>;
  }

  return (
    <EmptyKit loading={isLoading}>
      <div
        ref={ref}
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 100%;
          max-height: 0.38rem;
          width: 100%;
        `}
      >
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

        <div
          className={css`
            width: ${menuInnerWidth}px;
            height: 100%;
            overflow: hidden;
          `}
        >
          <div
            className={css`
              height: 100%;
              overflow: hidden;
            `}
            ref={emblaRef}
          >
            <div
              className={css`
                touch-action: pan-y pinch-zoom;
                backface-visibility: hidden;
                display: flex;
                height: 100%;
              `}
            >
              {menuList.map((menuItem, index) => {
                return (
                  <div
                    key={menuItem.shareURL + menuItem.label + index}
                    className={css`
                      min-width: 0;
                      flex-grow: 0;
                      flex-shrink: 0;
                      flex-basis: ${sizeFormat(100 / menuCount)}%;
                      padding: 0 0.12rem;
                      height: 100%;
                      max-height: 0.38rem;
                    `}
                  >
                    <MenuItem reportId={reportId} menuItem={menuItem} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </EmptyKit>
  );
}
