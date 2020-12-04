const fs = require('fs')
const path = require('path')

/* 
  异步的先序深度优先遍历
*/
function preDeep(dir, cb) {
  console.log(dir);
  fs.readdir(dir, (err, files) => {
    !function next(i) {
      if (i >= files.length) return cb()
      const current = path.join(dir, files[i])
      // console.log(current,'----');
      fs.stat(current, (err, stat) => {
        if (stat.isDirectory()) {
          preDeep(current, () => next(i + 1))
        } else {
          next(i + 1) 
        }
      })
    }(0)
  })
}

preDeep('a', () => { })