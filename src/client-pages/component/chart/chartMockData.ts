const standard = [
  {
    name: '合同未按期上传',
    value: 150,
    value1: 250,
  },
  {
    name: '超龄人员',
    value: 230,
    value1: 350,
  },
  {
    name: '特殊工种证书到期',
    value: 224,
    value1: 120,
  },
  {
    name: '人员健康状态异常',
    value: 218,
    value1: 170,
  },
  {
    name: '入场安全教育未完成',
    value: 135,
    value1: 230,
  },
  {
    name: '黑名单&红色通缉令',
    value: 147,
    value1: 120,
  },
]

const amountList = [
  {
    name: 'December1',
    receivableAmount: 5155,
    payableAmount: 3616,
    purAmount: 3547,
    supAmount: 1191,
  },
  {
    name: 'December2',
    receivableAmount: 4504,
    payableAmount: 3320,
    purAmount: 1526,
    supAmount: 2287,
  },
  {
    name: 'July',
    receivableAmount: 5086,
    payableAmount: 2299,
    purAmount: 826,
    supAmount: 1287,
  },
  {
    name: 'December3',
    receivableAmount: 1711,
    payableAmount: 1116,
    purAmount: 1826,
    supAmount: 987,
  },
  {
    name: 'AprilBB',
    receivableAmount: 1825,
    payableAmount: 1991,
    purAmount: 1526,
    supAmount: 2287,
  },
  {
    name: 'December4',
    receivableAmount: 3221,
    payableAmount: 1326,
    purAmount: 2741,
    supAmount: 2775,
  },
  {
    name: 'AprilAA',
    receivableAmount: 4756,
    payableAmount: 2375,
    purAmount: 1126,
    supAmount: 1887,
  },
  {
    name: 'NovemberB',
    receivableAmount: 1835,
    payableAmount: 2197,
    purAmount: 1956,
    supAmount: 4108,
  },
  {
    name: 'AugustD',
    receivableAmount: 4291,
    payableAmount: 1881,
    purAmount: 1150,
    supAmount: 2218,
  },
  {
    name: 'October',
    receivableAmount: 4841,
    payableAmount: 1900,
    purAmount: 3590,
    supAmount: 5125,
  },
  {
    name: 'AugustC',
    receivableAmount: 3546,
    payableAmount: 1514,
    purAmount: 2847,
    supAmount: 2784,
  },
  {
    name: 'NovemberA',
    receivableAmount: 4762,
    payableAmount: 2537,
    purAmount: 3819,
    supAmount: 1759,
  },
]

const kxys = [
  {
    name: '马銮湾保障房地铁社区二期A01~03地块',
    unitAmount: 570,
    segmentAmount: 300,
    subSegmentAmount: 100,
    projectAmount: 90,
    batchAmount: 110,
  },
  {
    name: '马銮湾保障房地铁社区二期A04~07地块',
    unitAmount: 780,
    segmentAmount: 400,
    subSegmentAmount: 70,
    projectAmount: 300,
    batchAmount: 210,
  },
  {
    name: '保障性住房龙泉公寓一期',
    unitAmount: 570,
    segmentAmount: 150,
    subSegmentAmount: 200,
    projectAmount: 300,
    batchAmount: 60,
  },
  {
    name: '洪茂居住区一期',
    unitAmount: 320,
    segmentAmount: 250,
    subSegmentAmount: 90,
    projectAmount: 300,
    batchAmount: 70,
  },
  {
    name: '东园保障性住房',
    unitAmount: 320,
    segmentAmount: 250,
    subSegmentAmount: 90,
    projectAmount: 300,
    batchAmount: 70,
  },
]
/**
 *   "2020-09",
      "2020-10",
      "2020-11",
      "2020-12",
      "2021-01",
      "2021-02",
      "2021-03",
      "2021-04",
      "2021-05",
      "2021-06",
      "2021-07",
      "2021-08",
       "purAmount": 3547,
    "supAmount": 1191
  },
  {
    "name": "Giant panda",
    "purAmount": 1526,
    "supAmount": 2287
 */

const pieData = [
  {
    name: '合格',
    value: 490,
  },
  {
    name: '整改中',
    value: 200,
  },
  {
    name: '整改待复检',
    value: 160,
  },
  {
    name: '逾期整改',
    value: 100,
  },
  {
    name: '复检合格',
    value: 50,
  },
]

const dates = [
  {
    name: '2020-09',
    value: 1150,
    value1: 3547,
    value2: 1547,
  },
  {
    name: '2020-10',
    value: 1230,
    value1: 1191,
    value2: 2547,
  },
  {
    name: '2020-11',
    value: 1024,
    value1: 1526,
    value2: 3047,
  },
  {
    name: '2020-12',
    value: 1818,
    value1: 2287,
    value2: 2447,
  },
  {
    name: '2021-01',
    value: 1635,
    value1: 2150,
    value2: 1847,
  },
  {
    name: '2021-02',
    value: 2147,
    value1: 2741,
    value2: 2047,
  },
  {
    name: '2021-03',
    value: 1147,
    value1: 1950,
    value2: 1247,
  },
  {
    name: '2021-04',
    value: 1247,
    value1: 1741,
    value2: 2547,
  },
  {
    name: '2021-05',
    value: 1447,
    value1: 1850,
    value2: 3147,
  },
  {
    name: '2021-06',
    value: 1747,
    value1: 1150,
    value2: 1547,
  },
  {
    name: '2021-07',
    value: 2547,
    value1: 4108,
    value2: 3147,
  },
  {
    name: '2021-08',
    value: 1447,
    value1: 1850,
    value2: 2547,
  },
]

export const chartMockData = {
  standard,
  amountList,
  kxys,
  dates,
  pieData,
}

export const chartMockDataOptions = [
  {
    label: '标准图表数据',
    value: 'standard',
  },
  {
    label: '饼图数据',
    value: 'pieData',
  },
  {
    label: '金融常用字段',
    value: 'amountList',
  },
  {
    label: '可信验收',
    value: 'kxys',
  },
  {
    label: '日期维度',
    value: 'dates',
  },
]

export interface ChartListItem {
  name: string
  value: number
  [property: string]: any
}
