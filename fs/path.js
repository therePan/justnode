const path = require('path')

//链接两个目录
console.log(path.join('a', 'b'));

//从当前路径出发，解析一个绝对路径
console.log(path.resolve('..', '.', 'a'));

//环境变量路径分隔符
//不同操作系统分割符不一样
// window，linux，mac
console.log(path.delimiter);
console.log(path.win32.delimiter);
console.log(path.posix.delimiter);

//文件路径分隔符
console.log(path.sep);
console.log(path.win32.sep);
console.log(path.posix.sep);

//获取文件名 bb.txt
console.log(path.basename('a/bb.txt'));
//文件名（bb.txt）减去扩展名（.txt）等于 bb
console.log(path.basename('a/bb.txt','.txt'));

//获取文件扩展名.txt
console.log(path.extname('a/bb.txt'));