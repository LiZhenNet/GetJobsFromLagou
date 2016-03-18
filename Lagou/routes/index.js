var express = require('express');
var router = express.Router();
var Job = require('../models/job');
router.get('/', function(req, res, next) {
  console.log(Job.getTotalListGroupByWorkYear());
  res.render('index', { title: 'Express' });
});

router.get('/workyear', function(req, res, next) {
  res.render('workyear', { title: 'Express' });
});
module.exports = router;
