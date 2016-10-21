"use strict";

let lodash = require('lodash');
/**
 * [formatDate description]
 * @type {Object}
 */
exports.formatDate = {
    msToDate: function(ms, format) {
        if (ms.toString().length === 10) {
            ms = ms * 1000;
        }
        format = format || "yyyy-MM-dd hh:mm:ss";
        let d = new Date(ms),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes(),
            seconds = d.getSeconds();

        let addPrefix = function(source){
            if(source < 10){
                return "0" + source;
            }else {
                return source;
            }
        };
        format = format.replace("yyyy", year)
            .replace("MM", addPrefix(month))
            .replace("dd", addPrefix(day))
            .replace("hh", addPrefix(hour))
            .replace("mm", addPrefix(minute))
            .replace("ss", addPrefix(seconds));
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

/**
 * 从文本中提取出@username 标记的用户名数组
 * @param {String} text 文本内容
 * @return {Array} 用户名数组
 */
exports.fetchUsers = function(text) {
    if (!text) {
        return [];
    }

    var ignoreRegexs = [
        /```.+?```/g, // 去除单行的 ```
        /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
        /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
        /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
        /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
        /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
    ];

    ignoreRegexs.forEach(function(ignore_regex) {
        text = text.replace(ignore_regex, '');
    });

    var results = text.match(/@[a-z0-9\-_]+\b/igm);
    var names = [];
    if (results) {
        for (var i = 0, l = results.length; i < l; i++) {
            var s = results[i];
            //remove leading char @
            s = s.slice(1);
            names.push(s);
        }
    }
    names = lodash.uniq(names);
    return names;
};

/**
 * 根据文本内容，替换为数据库中的数据
 * @param {String} text 文本内容
 * @param {Function} callback 回调函数
 */
exports.linkUsers = function(text) {
    var users = this.fetchUsers(text);
    console.log(users);
    for (var i = 0, l = users.length; i < l; i++) {
        var name = users[i];
        text = text.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](/user/' + name + ')');
    }
    return text;
};
