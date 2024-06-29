import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import Decimal from 'decimal.js'
import { getPercent } from '@/schema-component/utils';


export interface ProjectTypeListItem {
    region?: any;
    province?: any;
    city?: any;
    county?: any;
    type: string;
    typeName: string;
    progress?: any;
    num: number;
    percent: number;
    onNum?: any;
    endNum?: any;
    tag?: any;
    totalAmount: number;
    progressName?: any;
}


export function getPieOption({ list, activeIndex }: { list: ProjectTypeListItem[]; activeIndex: number }): EChartsOption {
    const { data1, data2, data3 } = apiDataToProjectTypeChartData(list, activeIndex);

    return {
        grid: {},
        polar: {},


        angleAxis: {
            show: false,
            // interval: 1,
            type: 'category',
            data: [],
        },
        radiusAxis: {
            show: false,
        },

        series: [
            {
                type: 'pie',
                radius: ['68%', '80%'],

                // strokeWidth: 0,
                itemStyle: {
                    borderWidth: 0,
                    color: 'transparent',
                },
                labelLine: {
                    show: false,
                    length: 30,
                    length2: 55,
                },
                label: {
                    show: true,
                    color: '#fff',
                    position: 'inside',
                    align: 'right',
                },
                name: '',
                data: data1,
            },
            {
                // stack: 'a',
                type: 'pie',
                radius: ['65%', '42%'],
                roseType: 'area',
                // strokeWidth: 0,
                zlevel: 10,
                itemStyle: {
                    borderWidth: 0,
                    color: '#4169E1',
                },
                emphasis: {
                    // show: true,
                    label: {
                        show: true,
                        color: '#6A5ACD',

                    },
                },
                label: {
                    show: true,

                    // textStyle: {

                    // },
                    fontSize: 12,
                    color: '#FDFFFF',
                    offset: [0, 0],
                    position: 'inside',
                    // rotate: 30,
                    align: 'right',
                    fontWeight: 'bold',
                    formatter: (a) => {
                        return a.percent + '%';
                    },
                    // formatter: '{c}%',
                },
                animation: false,
                data: data3,
            },
            {
                type: 'pie',

                zlevel: 99,
                radius: ['15%', '80%'],
                selectedOffset: 0,
                animation: false,
                itemStyle: {
                    borderWidth: 0
                },

                label: {
                    show: false,
                },
                data: data2,
            },
        ],
    };
}


function getNameColor(name = '') {
    if (name === '人工') {
        return "#A4FCEE"
    }
    if (name === '机械') {
        return "#84A6FF"
    }
    if (name === '费用') {
        return "#76F5B0"
    }
    if (name === '材料') {
        return "#64B7FB"
    }
    return "#64B7FB"
}

function apiDataToProjectTypeChartData(
    d: ProjectTypeListItem[],
    activeIndex: number = 0,
) {
    // d = [
    //   {
    //     num: 30,

    //     percent: 30,

    //     totalAmount: 1020,
    //     type: '其他',
    //     typeName: null,
    //   },
    //   {
    //     num: 50,

    //     percent: 50,

    //     totalAmount: 2020,
    //     type: '房屋建筑',
    //     typeName: null,
    //   },
    //   {
    //     num: 20,

    //     percent: 20,

    //     totalAmount: 2020,
    //     type: 'cccc',
    //     typeName: null,
    //   },
    // ];

    const data = d.map((d) => ({
        ...d,
        name: d.typeName || d.type,
        value: d.percent,
        max: 100,
        label: {
            color: '#fff',
        },
        itemStyle: {},
        emphasis: {
            itemStyle: {
                color: '#fff',
            },
        },
    }));

    const data1: any[] = [];
    const data2: any[] = [];
    const data3: any[] = [];

    data.forEach((d, i) => {
        // 主图
        data3.push({
            ...d,
            label: {
                color: i === activeIndex ? '#333' : '#fff',
                show: true,

                rotate: angleText(i, data.length),
            },
            itemStyle: {
                color: i === activeIndex ? 'rgba(25, 255, 224)' : '#4169E1',
            },
            emphasis: {
                itemStyle: {
                    color: i === activeIndex ? 'rgba(25, 255, 224)' : '#6A5ACD',
                },
            },
        });

        data1.push({
            ...d,
            value: 1,
            label: {
                color: i === activeIndex ? '#fff' : 'rgba(25, 255, 224)',
                rotate: angleText(i, data.length),
            },
        });
        // 阴影
        data2.push({
            value: 1,

            itemStyle: {
                color: i == activeIndex ? 'rgba(25, 255, 224,0.05)' : 'transparent',
            },
        });
    });

    return {
        data1,
        data2,
        data3,
    };
}
function angleText(i: number, num: number) {
    //每个元素的角度
    const everyAngle = 360 / num;
    //文字现在所在的角度
    const currentAngle = i * everyAngle + everyAngle / 2;
    //文字所在模块的所占角度


    if (currentAngle <= 90) {
        return -currentAngle;
    } else if (currentAngle <= 180 && currentAngle > 90) {
        return 180 - currentAngle;
    } else if (currentAngle < 270 && currentAngle > 180) {
        return 180 - currentAngle;
    } else if (currentAngle < 360 && currentAngle >= 270) {
        return 360 - currentAngle;
    }
}