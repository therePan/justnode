/* 
  linux经典的管道概念
  前者的输出是后者的输入
*/

let fs =require('fs')

let rs = fs.createReadStream('./1.txt',{
  highWaterMark:3
})


let ws = fs.createWriteStream('./2.txt',{
  highWaterMark:3
})

//可以实现数据的生产者和消费者速度的均衡
rs.on('data',(data)=>{
  let flag = ws.write(data)
  if(!flag) {
    rs.pause()
  }
})

//当一个流不处于drain状态，对write的调用会缓存数据块，并返回fasle，一旦所有当前缓存的数据块都排空了，那么drain事件就会触发
ws.on('drain',()=>{
  rs.resume()
})

rs.on('end',()=>{
  ws.end()
})