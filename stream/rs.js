const fs = require('fs')

//创建一个可读流
const rs = fs.createReadStream('./1.txt', {
  flags: 'r', //要对文件进行何种操作（r=>读）
  mode: 0o666, // 权限位
  start: 3, //从索引3的位置开始读
  end: 8, //到索引8的位置结束（包括8）
  highWaterMark: 3, //缓冲区大小（每次读三个）
  encoding:'utf-8'
})

rs.on('open',()=>{
  console.log('文件打开');
}) 

//默认情况下当监听data事件之后，会不停的读数据，然后触发data事件，触发完data事件后再次读数据
rs.on('data',(res)=>{
  console.log(res);
  
  rs.pause() //暂停读取和发射data事件
  rs.resume() //恢复读取和发射data事件
})