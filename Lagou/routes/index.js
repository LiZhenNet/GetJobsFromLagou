var express = require('express');
var router = express.Router();
var Job = require('../models/job');
router.get('/', function(req, res, next) {
    res.render('index', { title: '拉钩职位数据分析' });
});

router.get('/salary', function(req, res, next) {
    res.render('salary', { title: '薪资统计' });
});

router.get('/mostsalary', function(req, res, next) {
    Job.getMaxSalaryGroupByWorkYear(function(err,data) {
        if (err) {
            res.render('error', { error: err });
        }
        res.render('mostsalary', { title: '薪资最多', data: data });
    });
});

router.get('/workyear', function(req, res, next) {
    res.render('workyear', { title: '职位数' });
});
router.get('/search',function (req, res, next) {
   res.render('search', { title: '搜索' });
});
module.exports = router;
