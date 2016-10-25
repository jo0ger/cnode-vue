//TODO decide the api.
var create = function(config, refs) {
  if (!config) return null;
  var dom, childElement;

  if (typeof config === 'string') return document.createTextNode(config);

  if (config.tag) {
    dom = document.createElement(config.tag);
    for (var prop in config) {
      if (config.hasOwnProperty(prop)) {
        if (prop === 'content' || prop === 'tag') continue;
        if (prop === 'key' && refs) {
          var key = config[prop];
          if (key) {
            refs[key] = dom;
          }
          continue;
        }
        dom[prop] = config[prop];
      }
    }
    var content = config.content;
    if (content) {
      if (typeof content === 'string') {
        childElement = document.createTextNode(content);
        dom.appendChild(childElement);
      } else {
        if (!(content instanceof Array)) {
          content = [ content ];
        }
        for (var i = 0, j = content.length; i < j; i++) {
          var child = content[i];
          childElement = create(child, refs);
          dom.appendChild(childElement);
        }
      }
    }

  }
  return dom;
};

module.exports = create;