// 正确输出1
console.log(2)
console.info(2)

// 错误输出2
console.error(3)
console.warn(3)

//node console.log >1.log
//node console.js 1>a.log  2>&1 


console.time('cost')
var i=1
while(i++ < 1000000){}
console.timeEnd('cost')


console.assert(1==2,'报错')

// let a= {name:'abc',home:{name:'大连'}}
//列出对象结构
console.dir(global)

//跟踪当前调用栈
console.trace()