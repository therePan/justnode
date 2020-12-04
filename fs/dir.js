let fs = require('fs')

//当创建目录的时候要求父目录是存在的
fs.mkdir('a', function (err) {

})

//通过访问判断目录是否存在，如果存在err为null，否则不存在
fs.access('a', fs.constants.R_OK, function (err) {

})

//递归一步创建目录
function mkdirp(dir) {
  let paths = dir.split('/')
  !function next(index) {
    if (index > paths.length) return
    let current = paths.slice(0, index).join('/')
    fs.access(current, fs.constants.R_OK, function (err) {
      if (err) {
        fs.mkdir(current, 0o666, next.bind(null, index + 1))
      } else {
        next(index + 1)
      }
    })
  }(1)
} 


