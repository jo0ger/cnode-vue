var style = require('../src/style');
var getStyle = style.getStyle;
var setStyle = style.setStyle;

describe('style unit test', function() {
  var test_box;

  beforeEach(function() {
    test_box = document.getElementById('test_box');
    test_box.className = "test_box";
  });

  it('getStyle', function() {
    (function() {
      getStyle();
      getStyle(test_box);
    }).should.not.throw();

    getStyle(test_box, 'width').should.equal('100px');
  });

  it('setStyle', function() {
    (function() {
      setStyle();
      setStyle(test_box);
    }).should.not.throw();

    setStyle(test_box, 'width', '200px');
    getStyle(test_box, 'width').should.equal('200px');
  });
});