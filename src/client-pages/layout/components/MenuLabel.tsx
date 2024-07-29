import { css } from '@emotion/css'

import { NavLink } from 'react-router-dom'
import { cx } from '@/utils'

export function MenuLabel({
  menu,
  className,
}: {
  menu: any
  className?: string
}) {
  return (
    <NavLink
      style={({ isActive }) => ({
        color: isActive ? '#1677ff' : '#000',
      })}
      key={menu.label + menu.path}
      className={cx(
        className,
        css`
          padding: 6px 12px;
          margin: 0 4px;
        `,
        className,
      )}
      to={menu.path}
    >
      {menu.label}
    </NavLink>
  )
}
