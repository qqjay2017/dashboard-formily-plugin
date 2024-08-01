import { lazy } from 'react'

export const NavigateHome = lazy(() => import('@/client-pages/pages/home/NavigateHome'))

// 首页
export const HomeIndex = lazy(() => import('@/client-pages/pages/home'))

// 仪表盘
export const DashboardLayout = lazy(() => import('@/client-pages/pages/dashboard/DashboardLayout'))

export const DashboardIndex = lazy(() => import('@/client-pages/pages/dashboard'))

// 图表配置
export const ChartsLayout = lazy(() => import('@/client-pages/pages/charts/ChartsLayout'))
export const ChartsIndex = lazy(() => import('@/client-pages/pages/charts'))
export const ChartEditPage = lazy(() => import('@/client-pages/pages/charts/ChartEditPage'))

// 接口配置
export const ApiLayout = lazy(() => import('@/client-pages/pages/api/ApiLayout'))
export const ApiIndex = lazy(() => import('@/client-pages/pages/api'))
export const ApiEditPage = lazy(() => import('@/client-pages/pages/api/ApiEditPage'))

// 系统配置

export const SystemLayout = lazy(() => import('@/client-pages/pages/system/SystemLayout'))
export const DataSourceIndex = lazy(() => import('@/client-pages/pages/system/data-source'))
export const FilterIndex = lazy(() => import('@/client-pages/pages/system/filter'))
export const AppNameIndex = lazy(() => import('@/client-pages/pages/system/app-name'))

export const PreviewPage = lazy(() => import('@/client-pages/preview-page'))

export const DesignPage2 = lazy(
    () => import('../design-page/DesignPage2'),
)
