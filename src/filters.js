"use strict";

import tool from "./libs/tool.js";

exports.getDateFromNow = (time) => {
  return tool.dateFromNow(new Date() - new Date(time));
}
exports.formatDate = (time) => {
  return tool.formatDate.msToDate(new Date(time).getTime(), "yyyy-MM-dd hh:mm")
}
