/* 
  流动模式
  不走缓存
*/

let fs = require('fs')
let ReadStream = require('./ReadStream')

let rs = new ReadStream('./1.txt', {
  flags: 'r',
  mode: 0o666,
  start: 3,
  end: 8,
  autoClose: true,
  highWaterMark: 3,
  encoding: 'utf8'
})

rs.on('open', () => {
  console.log('open');
})

rs.on('data', (data) => {
  console.log(data,'---');
})

rs.on('end', () => {
  console.log('end');
})

rs.on('close', () => {
  console.log('close');
})
