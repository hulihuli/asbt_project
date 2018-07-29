/**
 * Created by huli on 2018/7/28.
 */

$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('chart1'));

    var myChart2 = echarts.init(document.getElementById('chart2'));

    var myChart3 = echarts.init(document.getElementById('chart3'));

    var myChart4 = echarts.init(document.getElementById('chart4'));

    var option1 = {
        title: {
            text: "各任务完成情况",
            textStyle: {
                color: '#666666'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七']
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            data: [0, 20, 18, 17, 25, 45, 26],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#1e88e5'
            },
            itemStyle:{
                color:'#1e88e5'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(30,136,229,0.6)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(30,136,229,0.1)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }]
    };
    var option2 = {
        title: {
            text: '总计',
            left: 'center',
            bottom: 20,
            textStyle: {
                color: '#1784f3',
                fontSize: 28
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['30%', '80%'],
                center: ['50%', '50%'],
                data: [
                    {value: 300, name: '安全意识'},
                    {value: 230, name: '环保意识'},
                    {value: 540, name: '创新意识'},
                    {value: 240, name: '成本意识'},
                    {value: 310, name: '系统性能力'},
                    {value: 320, name: '逻辑性能力'},
                    {value: 430, name: '功能性能力'},
                    {value: 360, name: '持续性能力'}
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#b1447b' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#25b3f0' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                }
            }
        ]
    };
    var option3 = {
        title: {
            text: "任务",
            textStyle: {
                color: '#0b65e7'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['环保意识', '环保意识', '环保意识', '环保意识', '环保意识', '环保意识', '环保意识']
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            data: [0, 20, 18, 17, 25, 45, 26],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#1e88e5'
            },
            itemStyle:{
                opacity:0
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(30,136,229,0.6)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(30,136,229,0.1)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }]
    };
    var option4 = {
        title: {
            text: '堆叠区域图',
            textStyle:{
                color:'#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLabel:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color:'#ffffff'
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:['#488ced']
                    }
                },
                data: ['安全意识', '安全意识', '安全意识', '安全意识', '安全意识', '安全意识', '安全意识']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color:'#ffffff',
                    formatter: '{value}%'
                },
                axisLine:{
                    lineStyle:{
                        color:'#ffffff'
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:['#488ced']
                    }
                }
            }
        ],
        series: [
            {
                name: '能力图谱',
                type: 'line',
                stack: '总量',
                data: [20, 32, 51, 60, 90, 50, 70],
                lineStyle: {
                    color: '#ffffff'
                },
                smooth: true,
                itemStyle:{
                    color:'#ffffff'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(255,255,255,0.1)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(255,255,255,0.8)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            {
                name: '匹配图谱',
                type: 'line',
                stack: '总量',
                data: [50, 24, 40, 34, 60, 30, 70],
                lineStyle: {
                    color: '#ffffff'
                },
                smooth: true,
                itemStyle:{
                    color:'#ffffff'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(255,255,255,0.1)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(255,255,255,0.8)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    myChart2.setOption(option2);
    myChart3.setOption(option3);
    myChart4.setOption(option4);

});