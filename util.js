let arr = ['你好你好你好', '3','1','短发短发']

console.log(Buffer.from(arr));
// console.log(typeof Buffer.from(arr));

for(b of Buffer.from(arr)) {
  console.log(b);
}

// console.log(new Buffer('12'));
// console.log(Buffer.from('12'));
// console.log(Buffer.from('12').toString());