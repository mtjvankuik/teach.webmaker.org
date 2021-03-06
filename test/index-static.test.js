var should = require('should');

var indexStaticWatcher = require('../lib/index-static-watcher').create();

describe('index-static', function() {
  var indexStatic;

  this.timeout(10000);

  beforeEach(function(done) {
    indexStaticWatcher.build(function(err, newIndexStatic) {
      if (err) return done(err);

      indexStatic = newIndexStatic;
      done();
    });
  });

  it('should work w/o meta options', function(done) {
    indexStatic.generate('/', {}, function(err, html) {
      should(err).equal(null);
      done();
    });
  });

  it('should include meta options', function(done) {
    indexStatic.generate('/', {
      meta: { foo: 'bar' }
    }, function(err, html) {
      should(err).equal(null);
      html.should.match(/meta name="foo" content="bar"/);
      done();
    });
  });

  it('should include page title', function(done) {
    indexStatic.generate('/', {
      title: 'hello there'
    }, function(err, html) {
      should(err).equal(null);
      html.should.match(/\<title\>hello there\<\/title\>/);
      done();
    });
  });
});