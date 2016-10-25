var assert = require('assert');
var equals = require('./index');

assert(equals({a:1, b:'nada'}, {b:'nada', a:1}));
assert(!equals({a:1, b:'nada'}, {b:'nada', a:2}));
assert(!equals({a:1, b:''}, {b:'nada', a:1}));
assert(!equals({a:1, b:'nada'}, {a:1}));
assert(!equals({a:1}, {a:1, b:'nada'}));