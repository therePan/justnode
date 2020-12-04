let fs = require('fs')

//为了实现节约内存的拷贝，读一定写一点
function copy(src, target) {
  const BUFFER_SIZE = 3
  fs.open(src, 'r', 0o666, function (err, readFd) {
    fs.open(target, 'w', 0o666, function (err, writeFd) {
      let buff = Buffer.alloc(BUFFER_SIZE)
      !function next() {
        fs.read(readFd, buff, 0, BUFFER_SIZE, null,0, function (err, bytesRead, buffer) {
          if (bytesRead > 0) {
            fs.write(writeFd, buff, 0, bytesRead, next)
          } else {

            //强行把缓存区的数据写入文件，并且关闭
            fs.fsync(writeFd, function (err) {
              fs.close(writeFd,function () {
                console.log(关闭);
              })
              fs.close(readFd,function () {
                console.log(关闭);
              })
            })
          }
        })
      }()
    })
  })
}

copy('./1.txt','./3.txt')