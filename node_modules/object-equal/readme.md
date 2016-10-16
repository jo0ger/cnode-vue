# object-equal

simple function that tests, if two objects are equal (shallow).

## install

```js
npm install object-equal
```

## usage
```js
var assert = require('assert');
var equals = require('object-equal');

assert(equals({a:1, b:'nada'}, {b:'nada', a:1}));
assert(!equals({a:1, b:'nada'}, {b:'nada', a:2}));
assert(!equals({a:1, b:''}, {b:'nada', a:1}));
assert(!equals({a:1, b:'nada'}, {a:1}));
assert(!equals({a:1}, {a:1, b:'nada'}));
```


## test

```js
npm test
```

## license

MIT
