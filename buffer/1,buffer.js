//分配一个长度为6个字节 的buffer
// 会把所有的字节设置为0
// 可以提供默认值
let buf1 = Buffer.alloc(6, 2)
console.log(buf1);

//分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(6)
console.log(buf2);

let buf3 = Buffer.from('珠峰')
console.log(buf3);

let buf4 = Buffer.alloc(6)
// buf4.fill(3, 1, 3)
buf4.write('珠峰', 0, 3, 'utf8')
console.log(buf4.toString());

let buf5 = Buffer.alloc(6)
buf5.writeInt8(0, 0)
buf5.writeInt8(16, 1)
buf5.writeInt8(32, 2)
console.log(buf5);


let buf6 = Buffer.alloc(4)
buf6.writeUInt16BE(256, 0) //高位在前
console.log(buf6);
console.log(buf6.readUInt16BE(0));
buf6.writeUInt16LE(256, 2) //地位在前
console.log(buf6);
console.log(buf6.readUInt16LE(2));


let buf7 = Buffer.alloc(6, 1)
let buf8 = buf7.slice(2, 6) //浅拷贝
buf8.fill(4)
console.log(buf8);
console.log(buf7);

/* 
  string_decoder
  它的出现是为了解决乱码问题
*/

let buf9 = Buffer.from('珠峰培训')
let buf10 = buf9.slice(0, 5)
let buf11 = buf9.slice(5)
console.log(buf10.toString());
console.log(buf11.toString());

let { StringDecoder } = require('string_decoder')
let sd = new StringDecoder()
//write会判断是不是一个字符，如果是会输出，如果不是则会缓存起来 等到下次write的是你合并到一起输出
console.log(sd.write(buf10));
console.log(sd.write(buf11));


//concat链接buffer
let buf12 = Buffer.from('珠')
let buf13 = Buffer.from('峰')
let buf14 = Buffer.concat([buf12, buf13])
console.log(buf14.toString());