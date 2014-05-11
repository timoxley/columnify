var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = {
  "mocha@1.18.2": 1,
  "commander@2.0.0": 1,
  "debug@0.8.1": 1,
  "diff@1.0.7": 1,
  "glob@3.2.3": 1,
  "graceful-fs@2.0.3": 1,
  "growl@1.7.0": 1,
  "inherits@2.0.1": 4,
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

test('objects are automatically converted into k/v array', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/auto-columns-expected.txt', 'utf8')
  t.equal(columnify(data).trim(), expected.trim())
})

test('column names can be provided', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/auto-columns-expected.txt', 'utf8')
  expected = expected.replace('VALUE', 'COUNT', 'gmi')
  // RE 'count': picked a word with same length (as 'value') so didn't need a
  // new fixture (damn whitespace)
  t.equal(columnify(data, {columns: ['key', 'count']}).trim(), expected.trim())
})
