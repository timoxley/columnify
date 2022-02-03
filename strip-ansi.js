// const ansiRegex = require('ansi-regex');

const stripAnsi = async(string) => {
  const { default: ansiRegex } = await import('ansi-regex');
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }

  return string.replace(ansiRegex(), '');
}
