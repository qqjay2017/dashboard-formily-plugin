import { css } from '@emotion/css'
import type { HeaderMenuItemType } from '../HeaderMenu/types'
import { cx, rs } from '@/utils'
import { useReportShare } from '@/hooks'

const activeBg = rs('/assets/schema-component/header5/activeMenuBg.png')

const activeStyle = css`
  color: #64e3ff;
  &::after {
    position: absolute;
    left: 50%;
    bottom: 1px;
    content: "";
    margin-left: -38px;
    width: 76px;
    height: 3px;
    background-image: url(${activeBg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
`
interface ILevel1MenuItemProps extends HeaderMenuItemType {
  reportId: string
}

export function Level1MenuItem({
  label,
  reportId,
  shareURL,
  children = [],
}: ILevel1MenuItemProps) {
  const isActive = reportId && shareURL && reportId === shareURL
  const { reportShare } = useReportShare()

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        reportShare(children[0]?.shareURL || shareURL, {
          isHref: true,
        })
      }}
      className={cx(
        css`
          user-select: none;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 0.18rem;
          color: rgba(195, 212, 229, 0.4);
          line-height: 0.2rem;
          cursor: pointer;
          position: relative;
          &.active,
          &:hover {
            ${activeStyle}
          }
        `,
        isActive ? activeStyle : '',
      )}
    >
      {label}
    </div>
  )
}
