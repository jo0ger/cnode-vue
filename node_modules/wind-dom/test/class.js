var clazz = require('../src/class');
var hasClass = clazz.hasClass;
var addClass = clazz.addClass;
var removeClass = clazz.removeClass;

describe('className util test', function() {
  var test_box;

  beforeEach(function() {
    test_box = document.getElementById('test_box');
    test_box.className = "test_box";
  });

  it('hasClass', function(){
    hasClass(test_box).should.be.false;
    hasClass().should.doesNotThrow;
    (function() {
      hasClass(test_box, 'test_box a');
    }).should.throw();
    hasClass(test_box, 'test_box').should.be.true;
    hasClass(test_box, 'test_box2').should.be.false;
  });

  it('addClass', function() {
    (function() {
      addClass();
      addClass(test_box);
    }).should.not.throw();
    addClass(test_box, 'a');
    hasClass(test_box, 'a').should.be.true;
  });

  it('removeClass', function() {
    (function() {
      removeClass();
      removeClass(test_box);
    }).should.not.throw();
    removeClass(test_box, 'a');
    test_box.className.should.equal('test_box');
    removeClass(test_box, 'test_box');
    test_box.className.should.equal('');
  });
});