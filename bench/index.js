var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = require('./large.json')

test('handling large data', function(t) {
  t.plan(1)
  console.time('large data')
  t.ok(columnify(data, {
    config: {
      description: {
        maxWidth: 30,
        minWidth: 10
      }
    }
  }))
  console.timeEnd('large data')
})


