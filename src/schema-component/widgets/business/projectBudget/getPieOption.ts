import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import Decimal from 'decimal.js'
import { getPercent } from '@/schema-component/utils';
export interface FeeListItem {
    name: string;
    value: number;
}


export function getPieOption({ feeList }: { feeList: FeeListItem[] }): EChartsOption {
    const total = feeList.reduce((memo, cur) => {
        memo = memo.add(cur.value || 0)
        return memo
    }, new Decimal(0)).toNumber()
    return {
        tooltip: {},
        series: [{
            name: '',
            type: 'pie',

            radius: ["80%", "80%"],
            label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                formatter: (params: any) => {
                    console.log(params, 'params')
                    const percent = getPercent(params.value, total, {
                        fixed: 2
                    });
                    if (params.name !== '') {
                        return params.name + '\n{white|' + '占比' + percent + '%}';
                    } else {
                        return '';
                    }
                },
                rich: {
                    white: {
                        color: '#ddd',
                        align: 'center',
                        padding: [5, 0]
                    }
                }
            },
            labelLine: {
                show: false
            },

            data: feeList.reduce((memo, fee) => {
                memo.push({
                    ...fee,
                    itemStyle: {
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
                    itemStyle: {
                        label: {
                            show: false
                        },
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
