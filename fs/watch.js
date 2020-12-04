let fs = require('fs')

//监控文件的变化，当文件发生变化之后执行相应的回调函数

fs.watchFile('b.txt', function (newStat, prevStat) {
  // console.log(arguments);
  if (Date.parse(prevStat.ctime) === 0 && Date.parse(newStat.ctime) !== 0) {
    console.log('新增加的文件');
  } else if (Date.parse(prevStat.ctime) !== 0 && Date.parse(newStat.ctime) === 0) {
    console.log('文件删除');
  } else if (Date.parse(newStat.ctime) !== Date.parse(prevStat.ctime)) {
    console.log('文件修改');
  }
})  
