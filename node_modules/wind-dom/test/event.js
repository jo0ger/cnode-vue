var event = require('../src/event');
var on = event.on;
var off = event.off;
var once = event.once;

describe('event util', function() {
  var test_box;

  beforeEach(function() {
    test_box = document.getElementById('test_box');
    test_box.className = "test_box";
  });

  it('should add event to dom', function() {
    (function() {
      on();
      on(test_box);
      on(test_box, 'click');
    }).should.not.throw();
    var handler = sinon.spy();
    on(test_box, 'click', handler);

    test_box.click();
    handler.should.calledOnce;
    test_box.click();
    handler.should.calledTwice;

    off(test_box, 'click', handler);

    test_box.click();
    handler.should.calledTwice;
  });

  it('should remove event of dom', function() {
    (function() {
      off();
      off(test_box);
      off(test_box, 'click');
    }).should.not.throw();
    var handler = sinon.spy();
    on(test_box, 'click', handler);

    test_box.click();
    handler.should.calledOnce;

    off(test_box, 'click', handler);

    test_box.click();
    handler.should.calledOnce;
  });

  it('should bind event once', function() {
    (function() {
      once();
      once(test_box);
      once(test_box, 'click');
    }).should.not.throw();

    var handler = sinon.spy();
    once(test_box, 'click', handler);

    test_box.click();
    handler.should.calledOnce;
    test_box.click();
    handler.should.calledOnce;

    off(test_box, 'click', handler);

    test_box.click();
    handler.should.calledOnce;
  });
});