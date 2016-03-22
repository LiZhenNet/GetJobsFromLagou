var express = require('express');
var router = express.Router();
var Job = require('../models/job');
router.get('/getTotalListGroupByWorkYear', function(req, res, next) {
    Job.getTotalListGroupByWorkYear(function(err, data) {
        if (err) {
            res.render('error', { error: err });
        }
        var result = [];
        data.forEach(function(element) {
            result.push({ value: element.total, name: element._id });
        }, this);
        res.json(result);
    })
});
router.post('/getSalary', function(req, res, next) {
    var result = {};
    Job.getMinSalaryGroupByWorkYear(function(err, data) {
        if (err) {
            res.render('error', { error: err });
        }
        result.legend = [];
        result.min = [];
        result.max = [];
        result.avg = [];
        data.forEach(function(element) {
            result.legend.push(element._id);
            result.min.push(element.minValue);
        }, this);
        Job.getAvgSalaryGroupByWorkYear(function(err, data) {
            if (err) {
                res.render('error', { error: err });
            }
            data.forEach(function(element) {
                result.avg.push(element.avgValue.toFixed(2));
            }, this);
            Job.getMaxSalaryGroupByWorkYear(function(err, data) {
                if (err) {
                    res.render('error', { error: err });
                }
                data.forEach(function(element) {
                    result.max.push(element.maxValue);
                }, this);
                res.json(result);
            });
        });
    });
});
router.post('/getCompanyListByMaxSalary',function(req, res, next){
   var workyear=req.body.workyear; 
   Job.getCompanyListByWorkYear(workyear,function(err,result){
       res.json(result);
   });
});
module.exports = router;