var test = require('tape')
var fs = require('fs')

var splitIntoLines =  require('../utils').splitIntoLines

test('lines under max are ok', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dinosaur cabbages', 32), ['dinosaur cabbages'])
})

test('lines at max are ok', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dinosaur cabbages', 17), ['dinosaur cabbages'])
})

test('lines at max with multiple spaces are ok', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dinosaur cabbages mechanic', 26), ['dinosaur cabbages mechanic'])
})

test('lines over max will be split', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dinosaur cabbages', 16), ['dinosaur', 'cabbages'])
})

test('splits lines under max onto multiple lines', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dinosaur cabbages', 7), ['dinosaur', 'cabbages'])
})

test('can put multiple words per line', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dog cat cow bat mat', 7), [
    'dog cat',
    'cow bat',
    'mat'
  ])
})

test('single existing newline is preserved', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dog\n cat cow bat mat', 7), [
    'dog',
    'cat cow',
    'bat mat'
  ])
})

test('multiple existing newlines are preserved', function(t) {
  t.plan(1)
  t.deepEqual(splitIntoLines('dog\n\n cat\n cow \nbat mat', 7), [
    'dog',
    '',
    'cat',
    'cow',
    'bat mat'
  ])
})
