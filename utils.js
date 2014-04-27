function defaultWcwidth(str) {
  return str.length
}

/**
 * Pad `str` up to total length `max` with `chr`.
 * If `str` is longer than `max`, padRight will return `str` unaltered.
 *
 * @param String str string to pad
 * @param Number max total length of output string
 * @param String chr optional. Character to pad with. default: ' '
 * @return String padded str
 */

function padRight(str, max, chr, wcwidth) {
  if(typeof chr == 'function' && wcwidth === undefined)
    wcwidth = chr, chr = undefined
  
  wcwidth = wcwidth || defaultWcwidth
  str = str != null ? str : ''
  str = String(str)
  var length = 1 + max - wcwidth(str)
  if (length <= 0) return str
  return str + Array.apply(null, {length: length})
  .join(chr || ' ')
}

/**
 * Split a String `str` into lines of maxiumum length `max`.
 * Splits on word boundaries.
 *
 * @param String str string to split
 * @param Number max length of each line
 * @return Array Array containing lines.
 */

function splitIntoLines(str, max, wcwidth) {
  wcwidth = wcwidth || defaultWcwidth
  return str.trim().split(' ').reduce(function(lines, word) {
    var line = lines[lines.length - 1]
    if (line && wcwidth(line.join(' ')) + wcwidth(word) < max) {
      lines[lines.length - 1].push(word) // add to line
    }
    else lines.push([word]) // new line
    return lines
  }, []).map(function(l) {
    return l.join(' ')
  })
}

/**
 * Add spaces and `truncationChar` between words of
 * `str` which are longer than `max`.
 *
 * @param String str string to split
 * @param Number max length of each line
 * @param Number truncationChar character to append to split words
 * @return String
 */

function splitLongWords(str, max, truncationChar, result, wcwidth) {
  if(typeof result == 'function' && wcwidth === undefined)
    wcwidth = result, result = undefined

  wcwidth = wcwidth || defaultWcwidth
  str = str.trim()
  result = result || []
  if (!str) return result.join(' ') || ''
  var words = str.split(' ')
  var word = words.shift() || str
  if (wcwidth(word) > max) {
    // slice is based on length no wcwidth
    var i = 0
    var wwidth = 0
    var limit = max - wcwidth(truncationChar)
    while (i < word.length) {
      var w = wcwidth(word.charAt(i))
      if(w + wwidth > limit)
        break
      wwidth += w
      ++i
    }

    var remainder = word.slice(i) // get remainder
    words.unshift(remainder) // save remainder for next loop

    word = word.slice(0, i) // grab truncated word
    word += truncationChar // add trailing … or whatever
  }
  result.push(word)
  return splitLongWords(words.join(' '), max, truncationChar, result, wcwidth)
}

/**
 * Exports
 */

module.exports.padRight = padRight
module.exports.splitIntoLines = splitIntoLines
module.exports.splitLongWords = splitLongWords