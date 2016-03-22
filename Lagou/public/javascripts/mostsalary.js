      $('#table').bootstrapTable({
             formatLoadingMessage: function () {
                    return "等待加载数据ing...";
                },
             formatNoMatches: function () { 
                    return '木有数据~~';
                },
                columns: [{
                        field: 'positionName',
                        title: '职位'
                    }, {
                        field: 'salary',
                        title: '薪资'
                    }, {
                        field: 'workYear',
                        title: '工作年限'
                    }, {
                        field: 'companyName',
                        title: '公司名称'
                    },
                    {
                        field: 'companySize',
                        title: '公司规模'
                    }, {
                        field: 'industryField',
                        title: '行业'
                    },{
                       field: 'positionId',
                       title: '查看',
                       formatter: urlformatter
                    }
                ]
            });
            function getList(workyear){
                $('#table').bootstrapTable('showLoading');
                $.post('/api/getCompanyListByMaxSalary',{workyear:workyear}).done(function(data) {
                     $('#table').bootstrapTable('load', data);
                     $('#table').bootstrapTable('hideLoading');
                });
            }
            function urlformatter(value, row, index){
                return"<a target='_blank' href='http://www.lagou.com/jobs/"+value+".html'>去投递</a>";
            }