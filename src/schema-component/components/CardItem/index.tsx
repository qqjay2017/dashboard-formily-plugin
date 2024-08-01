import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";
import React from "react";

interface CardItemProps extends PropsWithChildren {
  title?: string;
  direction?: "row" | "column";
}

function CardItem({ children, title, direction = "row" }: CardItemProps) {
  return (
    <div
      className={css`
        width: 100%;
      `}
    >
      <div
        className={css`
          font-size: 14px;
          line-height: 18px;
          margin-top: 12px;
          margin-bottom: 12px;
        `}
      >
        {title}
      </div>
      <div
        className={
          direction === "column"
            ? css``
            : css`
                display: flex;
                align-items: center;
                flex-direction: ${direction};
              `
        }
      >
        {children}
      </div>
    </div>
  );
}
export default CardItem;
