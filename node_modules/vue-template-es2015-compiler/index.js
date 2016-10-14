var buble = require('./buble')

// selectively support some handy ES2015 features in templates.
var options = {
  target: { chrome: 52 },
  transforms: {
    computedProperty: true,
    conciseMethodProperty: true,
    templateString: true
  }
}

module.exports = function transpile (code) {
  // replace "with(this){" with something that works in strict mode
  code = code.replace(/with\(this\)/g, 'if("__VUE_WITH__")')
  return buble.transform(code, options).code
    // add back with
    .replace(/if\s*\("__VUE_WITH__"\)/g, 'with(this)')
}
