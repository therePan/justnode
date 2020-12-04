const fs = require('fs')
const path = require('path')

function wideOrder(dir) {
  let arr = [dir]
  while (arr.length > 0) {
    const current = arr.shift()
    console.log(current);
    let stat = fs.statSync(current)
    if (stat.isDirectory()) {
      let files = fs.readdirSync(current)
      files.forEach(item => {
        arr.push(path.join(current, item))
      })
    }
  }
}

wideOrder('a') 