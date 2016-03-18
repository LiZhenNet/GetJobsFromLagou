var myChart = echarts.init(document.getElementById('chart'));
var option = {
    backgroundColor: '#2c343c',
    title: {
        text: '职位数根据工作年限分布',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    visualMap: {
        show: false,
        min: 0,
        max: 1000,
        inRange: {
            colorLightness: [0.8, 0.3]
        }
    }
};
myChart.setOption(option);
myChart.showLoading();
$.get('/api/getTotalListGroupByWorkYear').done(function(data) {
    myChart.hideLoading();
    myChart.setOption({
        series: [{
            name: '职位数',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            roseType: 'radius',
            data: data.sort(function(a, b) { return a.value - b.value }),
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: true,
                    length: 20,
                    length2: 30
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
        ]
    });
});