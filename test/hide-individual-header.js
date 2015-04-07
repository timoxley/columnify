var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = [{
  id: 0,
  name: 'module1',
  version: '0.0.1'
}, {
  id: 1,
  name: 'module2',
  version: '0.2.0'
}]

test('hide id column', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/hide-individual-header-expected.txt', 'utf8')
  t.equal(columnify(data, {config: {id: {showHeaders: false}} }), expected)
})
