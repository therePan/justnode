/*
  模块发展历史：
  1. 闭包，自执行函数
  // 2. require.js AMD
  // 3. sea.js CMD
  4. node.js common.js
  5. es6 es module
  6. umd amd+cmd+common+es+module
*/


/* 
  1. 在node.js中每个文件都是一个独立的模块 通过require方法可以同步加载模块
*/

/* 
  加载过程
  1. 找到文件
  2. 读取文件内容
  3. 把内容封装到一个函数立即执行
  4. 执行后把模块的module.exports 对象返回
*/

/* 
  为什么require是同步加载的，模块实现缓存，当第一次加载一个模块后，会缓存这个模块的 exports对象,以后加载直接读缓存
*/
console.log(Object.keys(require)); // resolve, main, extensions,cache

console.log(require.resolve('./require'));
console.log(require.main);
console.log(require.extensions);
/* 
  {
  '.js': [Function (anonymous)],
  '.json': [Function (anonymous)],
  '.node': [Function (anonymous)]
}
*/


/* 
  require.resolve //只返回模块路径，不执行
  require.main // 返回入口模块

*/


const _require = require('./require')
// console.log(_require);
console.log(Object.keys(require.cache));
console.log(Object.keys(require.cache));
