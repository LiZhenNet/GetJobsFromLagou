var superagent = require('superagent'),urlencode = require('urlencode'),Job = require('./models/job'),config = require('./config')
function InsertDB(Data) {
    for (var i = 0; i < Data.length; i++) {
        var job =Data[i];
        var newjob = new Job({
            positionId:job.positionId,
            positionName: job.positionName,
            positionAdvantage: job.positionAdvantage,
            salary: job.salary,
            companyName: job.companyName,
            companySize: job.companySize,
            companyLabelList: job.companyLabelList,
            industryField:job.industryField,
            education: job.education,
            workYear: job.workYear,
            createTime: job.createTime
        })
        newjob.save(function(err,data) {
           // console.log(err);
        });
    }
}
function getJobs(pageNo,city,kd) {
    var args = process.argv.slice(2);
    var url = '';
    if (pageNo === 1) {
        url = 'http://www.lagou.com/jobs/positionAjax.json?city=' + urlencode(city) + '&first=true&kd=' + urlencode(kd) + '&pn=' + pageNo;
    } else {
        url = 'http://www.lagou.com/jobs/positionAjax.json?city=' + urlencode(city) + '&first=false&kd=' + urlencode(kd) + '&pn=' + pageNo;
    }
    superagent.get(url).end(function(err, sres) {
        if (err) {
            hasNextPage = false;
            console.log(err);
        }
        var jobjson = JSON.parse(sres.text);
        if (jobjson.success) {
            InsertDB(jobjson.content.result);
            if (pageNo<jobjson.content.totalPageCount) {
                getJobs(pageNo + 1,city,kd);
            } else {
                console.log('抓取完毕，共抓取' + pageNo + '页数据');
                console.log('结束时间:'+new Date().toLocaleTimeString());
            }
        } else {
            console.log(jobjson.msg);
        }
    });
}
(function () {
    Job.removeAll();
    console.log(new Date().toLocaleTimeString() +'开始抓取'+config.city+'的'+config.kd+'职位' );
    getJobs(1,config.city,config.kd);
})();
