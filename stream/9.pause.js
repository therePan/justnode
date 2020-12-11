const fs = require('fs')
const path = require('path')
const ReadStream = require('./9.ReadStream')

let rs = new ReadStream(path.join(__dirname,'./1.txt'), {
  highWaterMark: 3,
})

rs.on('readable', () => {
  console.log(rs.length);
  let char = rs.read(1)
  console.log(char);
  console.log(rs.length);
})