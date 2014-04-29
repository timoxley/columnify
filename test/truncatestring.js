var test = require('tape')
var fs = require('fs')

var truncateString =  require('../utils').truncateString


test('truncate string which is longer than max', function(t) {
  t.plan(1)
  t.equal(truncateString('This is a very long sentencies', 20), 'This is a very long ')
})

test('truncate string which is shorter than max', function(t) {
  t.plan(1)
  t.equal(truncateString('short', 10), 'short')
})

test('truncate string with multibytes characters', function(t) {
  t.plan(1)
  t.equal(truncateString('这是一句话 That is a word', 15), '这是一句话 That')
})

test('return string when maxLineWidth is Infinity', function(t) {
  t.plan(1)
  t.equal(truncateString('这是一句话 That is a word', Infinity), '这是一句话 That is a word');
})

test('truncate funky data', function(t) {
  t.plan(5)
  t.equal(truncateString(null, 2), '')
  t.equal(truncateString(false, 4), 'fals')
  t.equal(truncateString(100005, 5), '10000')
  t.equal(truncateString(10, 10), '10')
  t.equal(truncateString([], 5), '')
})
