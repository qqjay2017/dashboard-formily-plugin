import { css } from '@emotion/css'
import { Dropdown } from 'antd'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { MenuLabel } from './components/MenuLabel'

const homeMenu = [
  {
    label: '首页',
    path: '/home/main',
  },
  {
    label: '仪表盘',
    path: '/dashboard/main',
  },
  {
    label: '组件',
    path: '/component/',
    children: [
      {
        key: 'component-chart',
        label: '图表组件',
        path: '/component/chart',
      },
    ],
  },
  {
    label: '素材',
    path: '/assets/main',
  },
  {
    label: '模版',
    path: '/template/main',
  },
  {
    label: '数据工厂',
    path: '/dapi/',
    children: [
      {
        key: 'external-data',
        label: '外部数据',
        path: '/dapi/external-data',
      },
      {
        key: 'magic-api',
        label: 'magic-api',
        path: '/dapi/magic-api',
      },
    ],
  },
  {
    label: '插件',
    path: '/plugin/main',
  },
  {
    label: '数字孪生',
    path: '/gis/main',
  },
]

interface HomeMenuProps extends PropsWithChildren {}

export function HomeMenu({ children }: HomeMenuProps) {
  const { pathname } = useLocation()
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
          display: flex;
          align-items: center;
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
            min-width: 130px;
            margin-right: 24px;
          `}
        >
          可视化大屏数字底座
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          {homeMenu.map((menu) => {
            if (menu.children && menu.children.length) {
              const isActive = pathname.includes(menu.path)

              return (
                <Dropdown
                  key={menu.label + menu.path}
                  menu={{
                    items: menu.children.map((child) => {
                      return {
                        ...child,

                        label: (
                          <MenuLabel
                            key={child.key + child.label}
                            menu={child}
                            className={css`
                              padding: 6px 2px;
                              margin: 0;
                            `}
                          />
                        ),
                      }
                    }),
                  }}
                >
                  <a
                    onClick={e => e.preventDefault()}
                    style={{
                      color: isActive ? '#1677ff' : '#000',
                    }}
                  >
                    {menu.label}
                  </a>
                </Dropdown>
              )
            }
            return <MenuLabel key={menu.label + menu.path} menu={menu} />
          })}
        </div>
      </div>
      {children}
      {/* <CreateFormBtn /> */}
    </div>
  )
}
