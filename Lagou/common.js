var common = {
    fromateWorkYear: function(workYear) {
        if (workYear.indexOf("不限") > -1) {
            return "不限";
        }
        if (workYear.indexOf('1年以下') > -1) {
            return "应届毕业生";
        }
        return workYear.replace(/年/g, "");
    },
    getMinSalary: function(salary) {
        try {
            var index = salary.indexOf('k');
            return parseFloat(salary.substr(0, index));
        } catch (err) {
            return 0;
        }
    },
    getMaxSalary: function(salary) {
        try {
            if(salary.indexOf('以上')>-1){
                return this.getMinSalary(salary);
            }
            var index = salary.indexOf('-');
            var k = salary.lastIndexOf('k');
            var str =salary.substr(index+1,k);
            return parseFloat(str);
        } catch (err) {
            return 0;
        }
    },
};
module.exports = common;
