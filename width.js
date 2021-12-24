var wcwidth = require('./wcwidth')

const getWidth = async(string) => {
  const { default: stripAnsi } = await import('ansi-regex');
  return wcwidth(stripAnsi(str))
}

module.exports = function(str) {

}
