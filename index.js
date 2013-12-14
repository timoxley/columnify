"use strict"

module.exports = function(items, options) {
  options = options || Object.create(null)
  var defaultColumn = options.defaultColumn || {
    maxWidth: Infinity,
    minWidth: 0
  }

  defaultColumn.maxWidth = defaultColumn.maxWidth || Infinity
  defaultColumn.minWidth = defaultColumn.minWidth || 0
  options.columnSplitter = options.columnSplitter || ' '
  options.spacing = options.spacing || '\n'

  options.widths = options.widths || Object.create(null)

  var columnNames = options.columns || []

  if (!columnNames.length) {
    items.forEach(function(item) {
      for (var columnName in item) {
        if (columnNames.indexOf(columnName) === -1) columnNames.push(columnName)
      }
    })
  }

  var columns = columnNames.reduce(function(columns, columnName) {
    // initialize each column
    columns[columnName] = {}
    return columns
  }, Object.create(null))

  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    var width = options.widths[columnName] || defaultColumn
    column.maxWidth = width.maxWidth || defaultColumn.maxWidth || 0
    column.minWidth = width.minWidth || defaultColumn.minWidth || 0
  })

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
    headers[columnName] = columnName.toUpperCase()
  })
  items.unshift(headers)

  // get actual width between min & max
  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    column.width = items.map(function(item) {
      return item[columnName]
    }).reduce(function(min, cur) {
      return Math.max(min, Math.min(column.maxWidth, Math.max(column.minWidth, cur.length)))
    }, 0)
  })

  // wrap long lines
  columnNames.forEach(function(columnName) {
    var column = columns[columnName]
    items = items.map(function(item) {
      item[columnName] = splitLines(item[columnName], column.width)
      if (options.truncate) item[columnName] = item[columnName].slice(0, 1)
      return item
    })
  })

  var rows = createRows(items, columns, columnNames)
  return rows.reduce(function(output, row) {
    return output.concat(row.reduce(function(rowOut, line) {
      return rowOut.concat(line.join(options.columnSplitter))
    }, []))
  }, []).join(options.spacing)
}

function createRows(items, columns, columnNames) {
  return items.map(function(item) {
    var row = []
    var numLines = 0
    columnNames.forEach(function(columnName) {
      numLines = Math.max(numLines, item[columnName].length)
    })
    for (var i = 0; i < numLines; i++) {
      row[i] = row[i] || []
      columnNames.forEach(function(columnName) {
        var column = columns[columnName]
        var val = item[columnName][i] || ''
        row[i].push(padRight(val, column.width))
      })
    }
    return row
  })
}

function padRight(str, max, chr) {
  var length = 1 + max - str.length
  if (length <= 0) return str
  return str + Array.apply(null, {length: length})
  .join(chr || ' ')
}

function padLeft(str, max, chr) {
  return Array.apply(null, {length: 1 + max - str.length}).join(chr || ' ') + str
}

function splitLines(str, max) {
  return str.trim().split(' ').reduce(function(lines, word) {
    var line = lines[lines.length - 1]
    if (line && line.join(' ').length + word.length < max) {
      lines[lines.length - 1].push(word) // add to line
    }
    else lines.push([word]) // new line
    return lines
  }, []).map(function(l) {
    return l.join(' ')
  })
}
