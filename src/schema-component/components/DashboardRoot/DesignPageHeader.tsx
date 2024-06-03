import { css } from "@emotion/css";
import React from "react";

export const DesignPageHeader = () => {
  return (
    <div
      className={css`
        width: 100%;
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e5;
        box-sizing: border-box;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        className={css`
          cursor: pointer;
          height: 40px;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          color: #2f2e3f;
          line-height: 40px;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 230px;
        `}
      >
        {/* 可视化大屏搭建 */}
      </div>
      <div>保存</div>
    </div>
  );
};
