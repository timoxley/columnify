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
}]

test('removes description column', function(t) {
  t.plan(2)
  var result = columnify(data, {
    columns: ['name', 'version'],
  })

  var columnHeaders = result.split('\n')[0]
  t.deepEqual(columnHeaders.split(/\s+/), [
    "NAME",
    "VERSION"
  ])
  t.ok(!(/description/gi.test(result)))
})

test('include == columns', function(t) {
  t.plan(2)
  var result = columnify(data, {
    include: ['name', 'version'],
  })

  var columnHeaders = result.split('\n')[0]
  t.deepEqual(columnHeaders.split(/\s+/), [
    "NAME",
    "VERSION"
  ])
  t.ok(!(/description/gi.test(result)))
})

test('columns preferred over include if both supplied', function(t) {
  t.plan(2)
  var result = columnify(data, {
    columns: ['name', 'version'],
    include: ['description'],
  })

  var columnHeaders = result.split('\n')[0]
  t.deepEqual(columnHeaders.split(/\s+/), [
    "NAME",
    "VERSION"
  ])
  t.ok(!(/description/gi.test(result)))
})
