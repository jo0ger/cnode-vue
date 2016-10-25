module.exports = function equals(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  return Object.keys(a).every(function(key) {
    return a[key] === b[key];
  });
};