/* 
  fs 核型模块读写文件
*/

let fs = require('fs')

fs.readFile('./1.txt', {
  encoding: 'utf8'
}, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
})

// ls -l read.js
// -rw-r--r--  1 justpan  staff  287 10 29 16:45 read.js
// r=4 w=2 x=1 可读可写可执行（文件所有者，文件所属组，其他用户 ）
// 666 可读可写
// chmod 777 2.txt 改变权限位为可读可写可执行
// mode 权限为设置
fs.writeFile('./2.txt', 'data', { flag: 'a', mode: 0o666 }, (err) => {
  console.error(err);
})

//appendFile 等于 writeFile flag='a'
fs.appendFile('./2.txt', 'data', (err) => {
  console.error(err);
})


// fd => file dispcripor 文件描述符
// 0标准输入，1标准输出，2错误输出 

process.stdout.write('pan2')

fs.open('./1.txt', 'r', 0o666, (err, fd) => {
  console.log(fd, 'fd');
  let buff = Buffer.alloc(3)
  fs.read(fd, buff, 0, 3, 0, function (err, byte) {
    console.log(buff.toString(),'fs.read');
  })
})
