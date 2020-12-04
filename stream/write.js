let fs = require('fs')
const WriteStream = require('./writeStream')

let ws = new WriteStream('./3.txt', {
  highWaterMark: 3,
  flags: 'w',
  mode: 0o666,
  start: 0,
  encoding: 'utf8',
  autoClose: true //当流写完后自动关闭文件
})

let n = 9

function write() {
  let flag = true
  while (n > 0 && flag) {
    flag = ws.write(n + '')
    console.log(flag);
    n--
  }
  ws.once('drain', write)
}
write()
