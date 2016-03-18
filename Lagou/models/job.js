var mongoose = require('mongoose'), config = require('../config'),common =require('../common');
var uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.db;
var db = mongoose.createConnection(uri);
db.on('error',console.error.bind(console,'连接错误:'));
var JobSchema = new mongoose.Schema({
    positionId:Number ,
    positionName: String,
    positionAdvantage: String,
    salary: String,
    minsalary:Number,
    maxsalary:Number,
    companyName: String,
    companySize: String,
    companyLabelList: [String],
    industryField:String,
    education: String,
    workYear: String,
    createTime: Date
}, { collection: 'Jobs' });
var jobModel = db.model('Job', JobSchema);
function Job(job) {
    this.positionId =job.positionId,
    this.positionName = job.positionName,
    this.positionAdvantage = job.positionAdvantage,
    this.salary = job.salary,
    this.minsalary=common.getMinSalary(job.salary),
    this.maxsalary=common.getMaxSalary(job.salary),
    this.companyName = job.companyName,
    this.companySize = job.companySize,
    this.companyLabelList = job.companyLabelList,
    this.industryField=job.industryField,
    this.education = job.education,
    this.workYear =common.fromateWorkYear(job.workYear),
    this.createTime = new Date(job.createTime)
};
Job.prototype.save = function(callback) {
    var newjob = new jobModel(this);
    newjob.save(function(err, job) {
        if (err) {
            return console.log(err.message);
        }
        callback(null, job);
    });
};
Job.removeAll=function(callback){
    jobModel.remove({},callback);
};
Job.getTotalListGroupByWorkYear=function (callback) {
    jobModel.aggregate([{$group : {_id : "$workYear",total:{$sum:1}}},{ $sort : {total:-1}}]).exec(callback);
};
module.exports = Job;
