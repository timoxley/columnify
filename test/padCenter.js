var test = require('tape')

var padCenter =  require('../utils').padCenter

test('pad string with spaces up to len (sides equal)', function(t) {
  t.plan(1)
  t.equal(padCenter('word', 10), '   word   ')
})

test('pad string with spaces up to len (sides not equal)', function(t) {
  t.plan(1)
  t.equal(padCenter('words', 10), '  words   ')
})

test('pad string with paddingChr of length >1, up to len', function(t) {
  t.plan(1)
  t.equal(padCenter('word', 10, ' .'), ' . word . ')
})
