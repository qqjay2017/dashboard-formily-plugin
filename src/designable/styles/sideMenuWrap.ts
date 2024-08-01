import { css } from '@emotion/css'
import { designScrollBarStyle } from './designScrollBarStyle'
import { cx } from '@/utils'

export const sideMenuWrapStyle = css` flex-grow: 0;
          flex-shrink: 0;
          height: 100%;
          width: 200px;
          position: relative;
            transition: all 0.2s;
          .ant-menu {
            min-height:100%;
          }
          `

export const layoutRightContentStyle = cx(
  designScrollBarStyle,
  css`
            flex-grow: 1;
            overflow:hidden  auto;
            position:relative;
            z-index:2;
           
          `,
)
