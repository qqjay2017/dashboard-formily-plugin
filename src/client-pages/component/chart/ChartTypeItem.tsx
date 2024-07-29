import { css } from '@emotion/css'
import React from 'react'
import type { IChartTypeItem } from './consts'
import { cx } from '@/utils'

interface IChartTypeItemProps extends IChartTypeItem {
  onClick?: React.MouseEventHandler
  isActive?: boolean
}
const activeStyle = css`
  color: #23527c;
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    top: 0;
    right: 0;
    background-color: #5470c6;
  }
`
export function ChartTypeItem({
  name,
  label,
  icon,
  onClick,
  isActive,
}: IChartTypeItemProps) {
  return (
    <div
      onClick={onClick}
      className={cx(
        css`
          width: 100%;
          height: 45px;

          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px 0 10px 20px;
          cursor: pointer;
          color: rgb(110, 112, 121);
          position: relative;

          transition: all 0.3s;
          &:hover {
            ${activeStyle}
          }
        `,
        isActive ? activeStyle : '',
      )}
    >
      <div
        className={css`
          font-size: 18px;
          width: 18px;
          height: 18px;
          line-height: 18px;
        `}
      >
        {icon}
      </div>
      <div
        className={css`
          margin-left: 10px;
        `}
      >
        {label}
      </div>
    </div>
  )
}
