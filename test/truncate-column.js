var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = [{
  name: 'alongnameshouldbesplitovermultiplelines',
  description: 'some description',
  version: '0.0.1',
}, {
  name: 'module-two',
  description: 'another description larger than the max',
  version: '0.2.0',
}, {
  name: 'module-three',
  description: 'thisisaverylongwordandshouldbetruncated',
  version: '0.2.0',
}, {
  name: '这是一个很长的名字的模块',
  description: '这真的是一个描述的内容这个描述很长',
  version: "0.3.3"
}]

test('specific columns can be truncated, while others not', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/truncate-column-expected.txt', 'utf8')

  t.equal(columnify(data, {
    config: {
      name: {
        truncate: false,
        maxWidth: 9,
        truncateMarker: ''
      },
      description: {
        truncate: true,
        maxWidth: 20
      }
    }
  }).trim(), expected.trim())
})

test('string proto does not get polluted by wcwidth', function(t) {
  t.equal(String.prototype.wcwidth, undefined)
  t.end()
})
