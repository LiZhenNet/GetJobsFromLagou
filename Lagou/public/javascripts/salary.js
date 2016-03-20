var myChart = echarts.init(document.getElementById('chart'));
myChart.showLoading();
$.post('/api/getSalary').done(function(data) {
    myChart.hideLoading();
    myChart.setOption( {
          title: {
        text: '薪资按照工资年限统计',
        left: 'center',
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {        
        top: 25,
        data:['最小值','平均值','最大值']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category', 
            data : data.legend
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'最小值',
            type:'bar',
            data:data.min
        },
        {
            name:'平均值',
            type:'bar',
            data:data.avg
        },
        {
            name:'最大值',
            type:'bar',
            data:data.max
        }
    ]
});
});