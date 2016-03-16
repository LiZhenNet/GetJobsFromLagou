var superagent = require('superagent');
var urlencode = require('urlencode');
var Job = require('./models/job');
function InsertDB(Data) {
    for (var i = 0; i < Data.length; i++) {
        var job =Data[i];
        var newjob = new Job({
            positionName: job.positionName,
            positionAdvantage: job.positionAdvantage,
            salary: job.salary,
            companyName: job.companyName,
            companySize: job.companySize,
            companyLabelList: job.companyLabelList,
            education: job.education,
            workYear: job.workYear,
            createTime: job.createTime
        })
        newjob.save(function(err,data) {
            console.log(err);
        });
    }
}
function getJobs(pageNo) {
    var args = process.argv.slice(2);
    var city = args[0] || '北京', kd = args[1] || '.Net', url = '';
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
            if (jobjson.content.hasNextPage) {
                getJobs(currentPageNo + 1);
            } else {
                console.log('抓取完毕，共抓取' + jobjson.content.currentPageNo + '页数据');
            }
        } else {
            console.log(jobjson.msg);
        }
    });
};
getJobs(1);