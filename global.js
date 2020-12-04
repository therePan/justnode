// console.dir(process);

// change directory 
// cwd => current working directory
console.log(global)

console.dir(process.cwd());

process.chdir('..') 
console.dir(process.cwd());

console.log(process.memoryUsage())
// { v8引擎最大使用内存 1.7G
//   rss: 20533248, 常驻内存
//   heapTotal: 4730880, 堆内存的申请总量
//   heapUsed: 2985528, 堆内存的使用量
//   external: 970506, 外部内存使用量
//   arrayBuffers: 9386
// }