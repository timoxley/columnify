var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = {
  "mocha@1.18.2": 10.1,
  "commander@2.0.0": 1,
  "debug@0.8.1": 0.21,
  "diff@1.0.7": 1,
  "glob@3.2.3": 1,
  "graceful-fs@2.0.3": 1,
  "growl@1.7.0": 1,
  "inherits@2.0.1": 94.1,
  "jade@0.26.3": 1,
  "commander@0.6.1": 1,
  "lru-cache@2.5.0": 3,
  "minimatch@0.2.14": 3,
  "mkdirp@0.3.5": 2,
  "sigmund@1.0.0": 3,
  "object-inspect@0.4.0": 1,
  "resumer@0.0.0": 1,
  "through@2.3.4": 1
}

test('numerics decimal aligned and to right', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/decimal-align-right-expected.txt', 'utf8')
  var actual = columnify(data, {config: { decimalAlign: 'right'} })
  t.equal(actual.trim(), expected.trim())
})
