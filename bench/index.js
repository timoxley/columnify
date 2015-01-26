var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = require('./large.json')

test('handling large data', function(t) {
  t.plan(3)
  // have to reduce dataset, otherwise bench
  // blows memory limit
  data = data.slice(0, data.length / 20)
  console.time('large data 1')
  t.ok(columnify(data, {
    config: {
      description: {
        maxWidth: 30,
        minWidth: 10
      }
    }
  }))
  console.timeEnd('large data 1')
  console.time('large data 2')
  t.ok(columnify(data, {
    config: {
      description: {
        maxWidth: 30,
        minWidth: 10
      }
    }
  }))
  console.timeEnd('large data 2')
  console.time('large data 3')
  t.ok(columnify(data, {
    config: {
      description: {
        maxWidth: 30,
        minWidth: 10
      }
    }
  }))
  console.timeEnd('large data 3')
})


