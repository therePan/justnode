let fs = require('fs')


//当往可写流里写数据的时候先写到缓存区，缓存区大小就是highWaterMark的大小，等缓存去满了在写入文件
const ws = fs.createWriteStream('./2.txt', {
  flags: 'w',
  mode: 0o666,
  start: 0,
  highWaterMark: 3
})

//flag如果缓存区已满，返回false，否则返回true
// 按理说如果返回false，就不能再往里面写了，但是继续写也不会丢失，会缓存到内存里面，等缓存区清空后再从内存里读出来
let flag = ws.write('1')
console.log(flag);

flag = ws.write('2')
console.log(flag);

flag = ws.write('3')
console.log(flag);

flag = ws.write('4')
console.log(flag);