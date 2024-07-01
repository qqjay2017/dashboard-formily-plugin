import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import Decimal from 'decimal.js'
import { getPercent } from '@/schema-component/utils';


export interface FeeListItem {
    name: string;
    value: number;
}


export function getPieOption({ feeList, chartColors }: { feeList: FeeListItem[]; chartColors: string[] }): EChartsOption {
    const total = feeList.reduce((memo, cur) => {
        memo = memo.add(cur.value || 0)
        return memo
    }, new Decimal(0)).toNumber()
    return {
        tooltip: {
            confine: true,
            borderWidth: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.50)', // 设置背景图片 rgba格式
            textStyle: {
                align: 'left',
                color: 'rgba(255, 255, 255, 1)', // 设置文字颜色
            },
            trigger: "item",
            axisPointer: {

                type: 'none',
            },
            valueFormatter: (value: number) => {
                return `${value}万元  ` + `   占比${getPercent(value, total, { fixed: 2 })}%`
            },

        },
        series: [{
            name: '',
            type: 'pie',

            radius: ["55%", "55%"],
            label: {
                show: true,
                position: 'outside',


                formatter: (params: any) => {

                    if (!params.name) {
                        return ""
                    }

                    const percent = getPercent(params.value, total, {
                        fixed: 2
                    });
                    return `${params.name}\n{white|${params.value}万} {white|${percent}%}`;
                },
                rich: {
                    white: {
                        align: 'center',
                        padding: [5, 2]
                    }
                }
            },
            labelLine: {
                show: false
            },

            data: feeList.reduce((memo, fee, index) => {


                memo.push({
                    ...fee,
                    label: {
                        show: true,
                        color: chartColors[index],
                    },
                    itemStyle: {

                        color: chartColors[index],
                        borderWidth: 5,
                        shadowBlur: 30,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                            offset: 0,
                            color: '#7777eb'
                        }, {
                            offset: 1,
                            color: '#70ffac'
                        }]),
                        shadowColor: 'rgba(142, 152, 241, 0.6)'
                    }
                })
                memo.push({
                    value: total * 0.04,
                    name: '',
                    label: {
                        show: false
                    },
                    itemStyle: {

                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                })
                return memo
            }, [])


        }]
    }
}


