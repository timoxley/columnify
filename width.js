var stripAnsi = require('strip-ansi')
var wcwidth = require('wcwidth')

var stepSize = 10000
module.exports = function(str) {
  // step through data in increments as the stripAnsi
  // regex is sensitive to large strings.
  var width = 0
  for (var i = 0; i < str.length; i += stepSize + 1) {
    width += wcwidth(stripAnsi(
      str.slice(i, i + stepSize)
    ))
  }
  return width
}
