var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = [{
  name: 'module1',
  version: '0.0.1',
  description: 'some description larger than the max'
}, {
  name: 'module2',
  version: '0.2.0',
  description: 'another description larger than the max'
}]

test('3 column', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/2-column-simple-expected.txt', 'utf8')
  console.error(columnify(data, {maxWidths: {
    description: 19
  }}))
  t.equal(columnify(data, {maxWidths: {
    description: 19
  }}), expected)
})

