"use strict"

var utils = require('./utils')
var padRight = utils.padRight
var splitIntoLines = utils.splitIntoLines
var splitLongWords = utils.splitLongWords

var DEFAULTS = {
  maxWidth: Infinity,
  minWidth: 0,
  columnSplitter: ' ',
  truncate: false,
  truncateMarker: '…',
  headingTransform: function(key) {
    return key.toUpperCase()
  },
  dataTransform: function(cell, column, index) {
    return cell
  }
}

module.exports = function(items, options) {
  options = options || {}

  var columnConfigs = options.config || {}
  delete options.config

  options = mixin(options, DEFAULTS)

  options.spacing = options.spacing || '\n'

  options.config = options.config || Object.create(null)

  var columnNames = options.include || []

  // if not suppled column names, automatically determine columns from data
  if (!columnNames.length) {
    items.forEach(function(item) {
      for (var columnName in item) {
        if (columnNames.indexOf(columnName) === -1) columnNames.push(columnName)
      }
    })
  }

  // initialize each column defaults
  var columns = columnNames.reduce(function(columns, columnName) {
    var column = Object.create(options)
    mixin(column, columnConfigs[columnName] || {})
    columns[columnName] = column
    return columns
  }, Object.create(null))

  // sanitize data
  items = items.map(function(item) {
    var result = Object.create(null)
    columnNames.forEach(function(columnName) {
      // null/undefined -> ''
      result[columnName] = item[columnName] != null ? item[columnName] : ''
      // toString everything
      result[columnName] = '' + result[columnName]
      // remove funky chars
      result[columnName] = result[columnName].replace(/\s+/g, " ")
    })
    return result
  })

  // add headers
  var headers = {}
  columnNames.forEach(function(columnName) {
    headers[columnName] = options.headingify(columnName)
  })
  items.unshift(headers)

  // get actual max-width between min & max
  // based on length of data in columns
  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    column.width = items.map(function(item) {
      return item[columnName]
    }).reduce(function(min, cur) {
      return Math.max(min, Math.min(column.maxWidth, Math.max(column.minWidth, cur.length)))
    }, 0)
  })

  // split long words
  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    items = items.map(function(item) {
      item[columnName] = splitLongWords(item[columnName], column.width, column.truncateMarker)
      return item
    })
  })

  // wrap long lines
  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    items = items.map(function(item) {
      var cell = item[columnName]
      item[columnName] = splitIntoLines(cell, column.width)

      // if truncating required, only include first line + add truncation char
      if (column.truncate && item[columnName].length > 1) {
          item[columnName] = splitIntoLines(cell, column.width - column.truncateMarker.length)
          var firstLine = item[columnName][0]
          if (!endsWith(firstLine, column.truncateMarker)) item[columnName][0] += column.truncateMarker
          item[columnName] = item[columnName].slice(0, 1)
      }
      return item
    })
  })

  // recalculate column widths from truncated output/multilines
  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    column.width = items.map(function(item) {
      return item[columnName].reduce(function(min, cur) {
        return Math.max(min, Math.min(column.maxWidth, Math.max(column.minWidth, cur.length)))
      }, 0)
    }).reduce(function(min, cur) {
      return Math.max(min, Math.min(column.maxWidth, Math.max(column.minWidth, cur)))
    }, 0)
  })

  var rows = createRows(items, columns, columnNames) // merge lines into rows

  // conceive output
  return rows.reduce(function(output, row) {
    return output.concat(row.reduce(function(rowOut, line) {
      return rowOut.concat(line.join(options.columnSplitter))
    }, []))
  }, []).join(options.spacing)
}

/**
 * Convert wrapped lines into rows with padded values.
 *
 * @param Array items data to process
 * @param Array columns column width settings for wrapping
 * @param Array columnNames column ordering
 * @return Array items wrapped in arrays, corresponding to lines
 */

function createRows(items, columns, columnNames) {
  return items.map(function(item) {
    var row = []
    var numLines = 0
    columnNames.forEach(function(columnName) {
      numLines = Math.max(numLines, item[columnName].length)
    })
    // combine matching lines of each rows
    for (var i = 0; i < numLines; i++) {
      row[i] = row[i] || []
      columnNames.forEach(function(columnName) {
        var column = columns[columnName]
        var val = item[columnName][i] || '' // || '' ensures empty columns get padded
        row[i].push(padRight(val, column.width))
      })
    }
    return row
  })
}

/**
 * Generic source->target mixin.
 * Copy properties from `source` into `target` if target doesn't have them.
 * Destructive. Modifies `target`.
 *
 * @param target Object target for mixin properties.
 * @param source Object source of mixin properties.
 * @return Object `target` after mixin applied.
 */

function mixin(a, source) {
  for (var key in source) {
    if (a.hasOwnProperty(key)) continue
    a[key] = source[key]
  }
  return a
}

/**
 * Adapted from String.prototype.endsWith polyfill.
 */

function endsWith(target, searchString, position) {
  position = position || target.length;
  position = position - searchString.length;
  var lastIndex = target.lastIndexOf(searchString);
  return lastIndex !== -1 && lastIndex === position;
}
