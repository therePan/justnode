let fs = require('fs')

//fs.rename 重命名
//fs.truncate 截取

fs.truncate('./1.txt', 5, (err, data) => {
  console.log(data);
})