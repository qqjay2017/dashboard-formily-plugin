import { css } from "@emotion/css";
import useEmblaCarousel from "embla-carousel-react";
import React, { memo, useEffect, useMemo } from "react";
import useResizeObserver from "use-resize-observer";
import type { HeaderMenuItemType } from "../HeaderMenu/types";
import { Level1MenuItem } from "./Level1MenuItem";
import { sizeFormat } from "@/utils";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/themes/style-components/ui";

export const Level1Menu = memo(
  ({
    menuList,
    activeSubMenu,
    reportId,
  }: {
    menuList: HeaderMenuItemType[];
    activeSubMenu: any;
    reportId: string;
  }) => {
    const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
    const menuCount = useMemo(() => {
      if (!width) return 0;
      return Math.floor(width / 140);
    }, [width]);

    const [emblaRef, emblaApi] = useEmblaCarousel({
      slidesToScroll: "auto",
    });

    useEffect(() => {
      if (!emblaApi || !reportId || !menuCount) {
        //
      } else {
        setTimeout(() => {
          const curIndex = activeSubMenu?.parent?.index || 0;
          if (curIndex > menuCount - 1) {
            emblaApi.scrollTo(Math.floor(curIndex / menuCount));
          }
        }, 500);
      }
    }, [
      menuList.length,
      reportId,
      menuCount,
      emblaApi,
      activeSubMenu?.parent?.index,
    ]);

    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
      <div
        className={css`
          padding: 0 40px;
          width: 100%;
          height: 100%;
          position: relative;
        `}
      >
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        <div
          ref={ref}
          className={css`
            position: relative;
            width: 100%;
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
                height: 100%;
                display: flex;
              `}
            >
              {menuList.map((menu, index) => {
                return (
                  <div
                    key={index}
                    className={css`
                      min-width: 0;
                      flex-grow: 0;
                      flex-shrink: 0;
                      flex-basis: ${sizeFormat(100 / menuCount)}%;
                      padding: 0;
                      height: 100%;
                    `}
                  >
                    <Level1MenuItem {...menu} reportId={reportId} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
