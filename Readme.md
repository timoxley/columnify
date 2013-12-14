# columnify

Create text-based columns suitable for console output. 
Supports minimum and maximum column widths via truncation and text wrapping.

Designed to handle sensible wrapping in npm search results.

## Examples

Text is aligned under column headings.

```js
var columnify = require('columnify')

var columns = columnify([{
  name: 'module1',
  version: '0.0.1'
}, {
  name: 'module2',
  version: '0.2.0'
}])

console.log(columns)
```
```
NAME    VERSION
module1 0.0.1  
module2 0.2.0  
```

### Wrapping Column Cells

You can define the maximum width before wrapping for
individual cells in columns.

```js
var columnify = require('columnify')

var columns = columnify([{
  name: 'mod1',
  description: 'some description which happens to be far larger than the max',
  version: '0.0.1',
}, {
  name: 'module-two',
  description: 'another description larger than the max',
  version: '0.2.0',
})

console.log(columns)
```
```
NAME       DESCRIPTION                    VERSION
mod1       some description which happens 0.0.1
           to be far larger than the max
module-two another description larger     0.2.0
           than the max
```

### Truncated Columns

Instead of wrapping, you can simply truncate at the maxiumum column width.

```js
var columns = columnify(data, {
  truncate: true,
  widths: {
    description: {
      maxWidth: 19
    }
  }
})

console.log(columns)
```

```
NAME       DESCRIPTION         VERSION
mod1       some description    0.0.1  
module-two another description 0.2.0  
```

### Custom Column Splitter

Columns can be split with custom characters.

```js

var columns = columnify(data, {
  columnSplitter: ' | '
})

console.log(columns)
```
```
NAME       | DESCRIPTION                                                  | VERSION
mod1       | some description which happens to be far larger than the max | 0.0.1
module-two | another description larger than the max                      | 0.2.0
```

## License

MIT
