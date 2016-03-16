var mongoose = require('mongoose');
var config = require('../config');
var uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.db;
var db = mongoose.createConnection(uri);
 db.on('error',console.error.bind(console,'连接错误:'));
var JobSchema = new mongoose.Schema({
    positionName: String,
    positionAdvantage: String,
    salary: String,
    companyName: String,
    companySize: String,
    companyLabelList: [String],
    education: String,
    workYear: String,
    createTime: Date
}, { collection: 'Jobs' });
var jobModel = db.model('Job', JobSchema);
function Job(job) {
    this.positionName = job.positionName,
        this.positionAdvantage = job.positionAdvantage,
        this.salary = job.salary,
        this.companyName = job.companyName,
        this.companySize = job.companySize,
        this.companyLabelList = job.companyLabelList,
        this.education = job.education,
        this.workYear = job.workYear,
        this.createTime = job.createTime
};
Job.prototype.save = function(callback) {
    var job = {
        positionName: this.positionName,
        positionAdvantage: this.positionAdvantage,
        salary: this.salary,
        companyName: this.companyName,
        companySize: this.companySize,
        companyLabelList: this.companyLabelList,
        education: this.education,
        workYear: this.workYear,
        createTime: new Date(this.createTime)
    };
    var newjob = new jobModel(job);
    newjob.save(function(err, job) {
        if (err) {
            return console.log(err.message);
        }
        callback(null, job);
    });
};
module.exports = Job;
