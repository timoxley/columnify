var test = require('tape')
var fs = require('fs')
var chalk = require('chalk')
// required when running inside faucet etc
// as chalk will detect output is not a tty
// and disable color for you automatically
chalk.enabled = true

var columnify =  require('../')

var data = {
  "mocha@1.18.2": chalk.yellow('3'),
  "commander@2.0.0": chalk.green('1'),
  "debug@0.8.1": chalk.red('6')
}

test('width calculated correctly even if ansi colors used.', function(t) {
  t.plan(1)
  var expected = fs.readFileSync(__dirname + '/ansi-expected.txt', 'utf8')
  var actual = columnify(data)
  t.equal(actual.trim(), expected.trim())
})
