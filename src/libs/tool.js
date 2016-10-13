"use strict";

/**
 * [formatDate description]
 * @type {Object}
 */
exports.formatDate = {
    msToDate: function(ms, format) {
        if (ms.toString().length === 10) {
            ms = ms * 1000;
        }
        var d = new Date(ms),
            format = format || "yyyy-MM-dd hh:mm:ss",
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes();
        seconds = d.getSeconds();


        format = format.replace("yyyy", year)
            .replace("MM", month)
            .replace("dd", day)
            .replace("hh", hour)
            .replace("mm", minute)
            .replace("ss", seconds);
        return format;
    }
};

/**
 * [fromNow description]
 * @param  {[type]} ms [description]
 * @return {[type]}    [description]
 */
exports.dateFromNow = function(ms){
  let time = parseFloat(ms) / 1000;
  let result = "";
  if(time){
    if(time > 60 && time < 3600){
      result = parseInt(time / 60.0) + "分钟前";
    }else if(time >= 3600 && time < 24 * 3600){
      result = parseInt(time / 3600.0) + "小时前";
    }else if(time >= 24 * 3600 && time < 30 * 24 * 3600){
      result = parseInt(time / 3600.0 / 24.0) + "天前";
    }else if(time >= 30 * 24 * 3600 && time < 12 * 30 * 24 * 3600){
      result = parseInt(time / 3600.0 / 24.0 / 30) + "月前";
    }else if(time >= 12 * 30 * 24 * 3600){
      result = parseInt(time / 3600.0 / 24.0 / 30.0 /12.0) + "年前";
    }else{
      result = parseInt(time / 1.0) + "秒前";
    }
  }
  return result;
};
