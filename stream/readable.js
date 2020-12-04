let fs = require('fs')

let rs = fs.createReadStream('./1.txt', {
  // highWaterMark: 3 //默认是64k
})

// 立刻从文件中读取highWaterMark（3字节）数据，读完之后填充缓存区，然后触发readable
rs.on('readable', () => {
  // console.log(rs.read(1),'--');
  // console.log(rs.read(1),'---');
  // console.log(rs.read(1),'----');
  console.log(rs._readableState.length,'---'); //打印缓存区字节长度
  setTimeout(() => {
    console.log(rs._readableState.length);
  }, 200);
})