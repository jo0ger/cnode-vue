var clazz = require('./class');
var event = require('./event');
var style= require('./style');
var create = require('./create');

module.exports = {
  on: event.on,
  off: event.off,
  once: event.once,
  getStyle: style.getStyle,
  setStyle: style.setStyle,
  removeClass: clazz.removeClass,
  addClass: clazz.addClass,
  hasClass: clazz.hasClass,
  create: create
};