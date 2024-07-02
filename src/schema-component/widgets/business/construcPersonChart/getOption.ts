import { EChartsOption } from 'echarts'
import * as  echarts from 'echarts'

export function getOption(constructionParticipant = []): EChartsOption {
    // const max = constructionParticipant.reduce((memo, cur) => {
    //     if (cur.number > memo) {
    //         return cur.number
    //     }
    //     return memo;
    // }, 0);

    // const genPictorialValue = Array(Math.floor(max / 3) - 1).fill(0).map((_, index) => {
    //     return (index + 1) * 3
    // })
    const numData = constructionParticipant.map(c => c.number || 0)

    return {
        title: [
            {
                text: '单位：人',
                textStyle: {
                    lineHeight: 12,
                    color: 'rgba(195, 212, 229, 1)',
                    fontSize: 12,


                },
                textAlign: 'left',
                textVerticalAlign: 'top',
                padding: 0,
                top: 0,
                left: 0

            },
            {
                text: '目前在册人数共计 {green|  6783 } 人',
                textStyle: {
                    lineHeight: 12,
                    color: 'rgba(195, 212, 229, 1)',
                    fontSize: 12,
                    rich: {
                        green: {
                            color: "rgba(89, 255, 205, 1)",
                            padding: [0, 2]
                        }
                    }

                },


                padding: 0,
                top: 0,
                right: 0,


            }
        ],
        tooltip: {
            confine: true,
            borderWidth: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.50)', // 设置背景图片 rgba格式
            textStyle: {
                align: 'left',
                color: 'rgba(255, 255, 255, 1)', // 设置文字颜色
            },
            trigger: 'axis',
            axisPointer: {
                type: 'none',
            },

        },
        grid: {
            containLabel: true,
            left: 0,
            top: 28,

            right: 0,
            bottom: 0,
        },
        xAxis: [
            {


                type: 'category',
                data: constructionParticipant.map(c => c.typeName,),
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,

                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    fontSize: 12,
                    color: "rgba(195, 212, 229, 0.5)" //X轴文字颜色

                },

            }
        ],
        yAxis: [{
            type: "value",

            splitLine: {
                show: false,

            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,

            },
            axisLabel: {
                show: true,
                fontSize: 12,
                color: "rgba(195, 212, 229, 0.5)"

            }
        }],
        series: [{
            name: "参建人员",
            type: "bar",
            barWidth: 15,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(22, 255, 185, 1)"
                },
                {
                    offset: 1,
                    color: "rgba(140, 249, 242, 1)"
                }
                ])
            },
            data: numData,
            z: 10,
            zlevel: 0
        },
        {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
                color: "rgba(0, 45, 86, 1)"

            },
            tooltip: {
                show: false
            },
            symbolRepeat: "fixed",
            symbolMargin: 2,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [18, 2],
            symbolPosition: "start",
            symbolOffset: [1, 1],
            data: numData,
            // width: 2,
            z: 0,
            zlevel: 1
        },


        ],
    }
}
