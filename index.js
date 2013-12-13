"use strict"

module.exports = function(data, options) {
  options = options || {}
  options.maxWidths = options.maxWidths || {}
  // initialize each column
  var columns = data.reduce(function(columns, item) {
    Object.keys(item).forEach(function(columnName) {
      columns[columnName] = columns[columnName] || [columnName]
    })
    return columns
  }, {})

  data.forEach(function(dat) {
    Object.keys(columns).forEach(function(columnName) {
      var column = columns[columnName]
      column.push(dat[columnName] || '')
    })
  })

  // calculate max-widths
  var maxWidth = {}
  Object.keys(columns).forEach(function(columnName) {
    var column = columns[columnName]
    maxWidth[columnName] = column.reduce(function(max, cur) {
      return Math.max(max, cur.length) 
    }, 0)
  })

  // wrap
  Object.keys(columns).forEach(function(columnName) {
    var column = columns[columnName]
    columns[columnName] = column.map(function(row) {
      return splitLines(row, options.maxWidths[columnName] || maxWidth[columnName])
    })
  })

  // add missing rows
  //
  Object.keys(columns).forEach(function(columnName) {
    var column = columns[columnName]
    //var newRow = []
    //Object.keys(columns)
    //column
    //newColumn.forEach(function() {
       
    //})
    //column.filter(function(row) {
      //row.filter()
    //})
  })

  // column data is now arrays
  //Object.keys(columns).forEach(function(columnName) {
    //var column = columns[columnName]
    //columns[columnName] = column.map(function(data) {
      //return padRight(data[0], maxWidth[columnName])
    //})
  //})

  return renderRows(columns)
}


[['line 1', 'line ']]

function renderRows(columns, rowNum, columnOffset, output) {
  output = output || ''
  rowNum = rowNum || 0
  if (rowNum >= Object.keys(columns)[0].length - 1) return output
  var row = []
  Object.keys(columns).forEach(function(columnName) {
    var column = columns[columnName]
    row.push(column[rowNum])
  })
  row.join(' ')
  output += row.join(' ') + '\n'
  return renderRows(columns, rowNum + 1, output)
}

function padRight(str, max, chr) {
  return str + Array.apply(null, {length: 1 + max - str.length}).join(chr || ' ')
}

function padLeft(str, max, chr) {
  return Array.apply(null, {length: 1 + max - str.length}).join(chr || ' ') + str
}

//function wrap(str, max, chr) {
  //return str.split('')
//}

function splitLines(str, max) {
  return str.split(' ').reduce(function(lines, word) {
    var line = lines[0] = lines[0] || []
    if (line.join(' ').length + word.length < max) {
      lines[0].push(word) // add to line
    }
    else lines.unshift([word]) // new line
    return lines
  }, []).map(function(l) {
    return l.join(' ')
  })
 
  //lines = lines || []
   
  //console.log('split', arguments)
  //out = out || ''
  //chr = chr || '\n'
  //if (str.length <= interval) {
    //out += str
    //return out
  //}
  //out += str.substr(0, interval) + chr
  //return split(str.substr(interval), interval, out, chr)
}
