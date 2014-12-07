var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = [{
  name: 'module1',
  description: 'some description',
  version: '0.0.1',
}, {
  name: 'module2',
  description: 'another description',
  version: '0.2.0',
}, {
  name: 'module3',
  description: '这是一段描述',
  version: '0.3.2'
}]


test('column data can be transformed', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/data-transform-expected.txt', 'utf8')
  t.equal(columnify(data, {
    dataTransform: function(data, column) {
      return data.toUpperCase()
    }
  }).trim(), expected.trim())
})

test('dataTransform gets columns', function(t) {
  var COLUMNS = Object.keys(data[0]).length
  var ASSERTIONS = 6
  t.plan(data.length * COLUMNS * ASSERTIONS)
  columnify(data, {
    dataTransform: function(data, column) {
      t.ok(column, 'has column')
      t.ok(column.name, 'column has name')
      t.ok(column.align, 'column has align')
      t.ok(column.maxWidth, 'column has maxWidth')
      t.ok('minWidth' in column, 'column has minWidth')
      t.ok('truncate' in column, 'column has truncate')
      return data
    }
  })
})

test('column headings can be transformed', function(t) {
  t.plan(1)
  var expected = fs
  .readFileSync(__dirname + '/data-transform-expected.txt', 'utf8')
  .replace(/VERSION/gmi, 'Version')

  t.equal(columnify(data, {
    dataTransform: function(data, column) {
      if (column.name === 'version') column.name = 'Version'
      return data.toUpperCase()
    }
  }).trim(), expected.trim())
})

test('column data can be transformed on a per-column basis', function(t) {
  var result = columnify(data, {
    config: {
      name: {
        dataTransform: function(data, column) { // only uppercase name
          t.equal(column.name, "name")
          return data.toUpperCase()
        }
      }
    }
  })
  t.ok(result.indexOf('MODULE1') !== -1, 'Module1 name was transformed')
  t.ok(result.indexOf('MODULE2') !== -1, 'Module2 name was transformed')
  t.ok(result.indexOf('MODULE3') !== -1, 'Module3 name was transformed')
  t.ok(result.indexOf('another description') !== -1, 'Description was not transformed')
  t.end()
})

