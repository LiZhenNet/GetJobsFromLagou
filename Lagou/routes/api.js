var express = require('express');
var router = express.Router();
var Job = require('../models/job');
router.get('/getTotalListGroupByWorkYear', function(req, res, next) {
    Job.getTotalListGroupByWorkYear(function(err, data) {
        if (err) {
            res.render('error', { error: err });
        }
        var result=[];
        data.forEach(function(element) {
            result.push({value:element.total, name:element._id});
        }, this);
        res.json(result);
    })
});
module.exports = router;