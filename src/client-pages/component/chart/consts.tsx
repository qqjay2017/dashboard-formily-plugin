import {
  RiBarChartLine,
  RiBubbleChartLine,
  RiLineChartLine,
  RiPieChartLine,
} from 'react-icons/ri'

export const allChartType = [
  {
    name: 'line',
    label: '折线图',
    icon: <RiLineChartLine />,
  },
  {
    name: 'bar',
    label: '柱状图',
    icon: <RiBarChartLine />,
  },
  {
    name: 'pie',
    label: '饼图',
    icon: <RiPieChartLine />,
  },
  {
    name: 'other',
    label: '其他',
    icon: <RiBubbleChartLine />,
  },
]

export type IChartTypeItem = (typeof allChartType)[0]

export const chartTypeOptions = allChartType.map((type) => {
  return {
    label: type.label,
    value: type.name,
  }
})

export const chartTypeNameMap = chartTypeOptions.reduce((memo, cur) => {
  memo[cur.value] = cur.label
  return memo
}, {})

export const defaultChartTemplate = 'option = {}'
