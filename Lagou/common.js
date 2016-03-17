var common={
    fromateWorkYear:function (workYear) {
        if(workYear.indexOf("不限")>-1){
            return "不限";
        }
        if(workYear.indexOf('1年以下')>-1){
            return "应届毕业生";
        }
        return workYear.replace(/年/g,"");
    }
}
module.exports=common