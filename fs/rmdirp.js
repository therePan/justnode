let fs = require('fs');
const { resolve } = require('path');
let path = require('path')
// 获取一个目录下面的所有文件或目录
// fs.readdir()
// 删除一个文件
// fs.unlink(path)
//删除一个空目录
// fs.rmdir()

function rmdirp(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stat) => {
      if (stat.isDirectory()) {
        fs.readdir(dir, (err, files) => {
          Promise.all(files.map(file => rmdirp(path.join(dir, file))))
            .then(() => {
              fs.rmdir(dir, resolve)
            })
        })
      } else {
        fs.unlink(dir, resolve)
      }
    })
  })
}
// console.log(path);

rmdirp('./a')

