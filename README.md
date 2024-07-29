# 长线目标:丰富完善组件

计算

高度90,
宽度 160

---

# 短线目标: 移动端/平板自动适配

# api编排完善

# 行为-路由调整

---

# 第二个模版

// "@antfu/eslint-config": "2.16.4",

### 全部自定义token

```
正常展示文字,label
textCommon: "#C3D4E5"

正常数字
textNum
通用数字高亮
textNumLight
高亮数字(蓝色)
textNumBlue: "#64E3FF"
高亮数字(绿色)
textNumGreen: "#59FFCD"
高亮数字(红色)
textNumRed: "#FF7777"

高亮文字
textLight

主字体
textPrimary

未选中颜色
textNoselect
选中颜色
textSelect

滚动条颜色
thumbColor

边框背景色
nodeContentBg
边框前台色(标题)
nodeContentForeground

```

TODO

发布逻辑，
全屏逻辑

## webpack

```
yarn add webpack webpack-cli  webpack-dev-server -D
yarn add html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin terser-webpack-plugin -D
yarn add @babel/core @babel/preset-env babel-loader @babel/preset-react -D
 yarn add less-loader less -D
```

## 统一接口请求

1. post方式

全局参数

1. 项目id, 季度
2. 公司id,用户id,员工id(自动)

3. 返回数据结构

情况1: 标准图表数据

```json
{
  "code": 200,
  "data": [
    { "name": "AAA", "value": 1234, "percent": 0.92 },
    { "name": "BBB", "value": 456, "percent": 0.12 },
    { "name": "CCCC", "value": 546, "percent": 0.02 }
  ]
}
```

例如

```json
{
  "code": 200,
  "data": [
    {
      "name": "合同未按期上传",
      "value": 14
    },
    {
      "name": "超龄人员",
      "value": 7
    },
    {
      "name": "特殊工种证书到期",
      "value": 3
    },
    {
      "name": "人员健康状态异常",
      "value": 20
    },
    {
      "name": "入场安全教育未完成",
      "value": 20
    },
    {
      "name": "黑名单&红色通缉令",
      "value": 13
    }
  ]
}
```

情况2: 标准图表数据+额外数据

```json
{
  "code": 200,
  "data": {
    "aaaNum": 123,
    "chartListData": [
      { "name": "AAA", "value": 1234, "percent": 0.12 },
      { "name": "BBB", "value": 456, "percent": 0.22 },
      { "name": "CCCC", "value": 546, "percent": 0.32 }
    ]
  }
}
```

如参建人员统计

```json
{
  "code": 200,
  "data": {
    "constructionTotal": 175,
    "chartListData": [
      {
        "name": "架子工",
        "value": 4
      },
      {
        "name": "木工班组",
        "value": 27
      },
      {
        "name": "塔吊班组",
        "value": 12
      },
      {
        "name": "杂工班组",
        "value": 47
      },
      {
        "name": "止水钢板班组",
        "value": 3
      },
      {
        "name": "桩基班组",
        "value": 82
      }
    ]
  }
}
```

情况3: 多个标准图表数据+额外数据

```json
{
  "code": 200,
  "data": {
    "aaaNum": 123,
    "chartListDataAaaaa": [
      { "name": "AAA", "value": 1234, "percent": 0.12 },
      { "name": "BBB", "value": 456, "percent": 0.22 },
      { "name": "CCCC", "value": 546, "percent": 0.32 }
    ],
    "chartListDataBbbbb": [
      { "name": "AAA", "value": 1234, "percent": 0.12 },
      { "name": "BBB", "value": 456, "percent": 0.22 },
      { "name": "CCCC", "value": 546, "percent": 0.32 }
    ]
  }
}
```

```
 SQL 错误 [1452] [23000]: Cannot add or update a child row: a
  foreign key constraint fails (`dashboard`.`apimanage`, CONSTRAINT `ApiManage_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `apigroup` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)
```

## 根据图表id渲染组件

```jsx
<ChartTemplateWithOutData
  chartId="38"
  dataSource={null}
  query={null}
  busData={busData}
/>
```

## 根据图表id渲染组件,并注入接口id

```jsx
<ChartTemplateWithOutData
  chartId="38"
  dataSource={{
    dataSourceId: "38a353fc-d871-40ec-957a-69073e7128bc",
  }}
  query={null}
  busData={busData}
/>
```

## 使用接口id请求接口

```
const { data: dataRes } = useDataBindFetch(
  {
    dataSourceId: "38a353fc-d871-40ec-957a-69073e7128bc",
  },
  {
    ...queryParams,
    dateType: tabValue,
  },
);
```
