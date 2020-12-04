/* 
  node是基于事件驱动
*/

let EventEmitter = require('events')
let util = require('util')

function Bell() {
  EventEmitter.call(this) //继承似有属性
}

// 进行原型继承
util.inherits(Bell, EventEmitter)

const bell = new Bell()
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.on('hi', function (a) { console.log('你好潘运帅'); })
bell.once('hi',function(){console.log('once');})
bell.emit('hi')
bell.emit('hi')
