var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = [{
  name: 'module1',
  version: '0.0.1'
}, {
  name: 'module2',
  version: '0.2.0'
}]

test('show column', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/show-headers-expected.txt', 'utf8')
  t.equal(columnify(data, {showHeaders:false}).trim(), expected.trim())
})
