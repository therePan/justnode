const EventEmmiter = require('events')
const fs = require('fs')

const NEW_LINE = 0x0A // /n 换行
const RETURN = 0x0D // /r 回车

class LineReader extends EventEmmiter {
  constructor(path, encoding = 'utf-8') {
    super()
    this._reader = fs.createReadStream(path)
    //当给一个对象添加新的监听函数的时候会触发newListener事件 
    this.on("newListener", (type, listener) => {
      this.buffers = []
      if (type === 'newline') {
        this._reader.on('readable', () => {
          let char;
          while (null != (char = this._reader.read(1))) {
            switch (char[0]) {
              case NEW_LINE:
                this.emit('newline', Buffer.from(this.buffers).toString(encoding))
                this.buffers.length = 0
                break;
              case RETURN:
                this.emit('newline', Buffer.from(this.buffers).toString(encoding))
                this.buffers.length = 0
                let newChar = this._reader.read(1)
                if (newChar[0] !== NEW_LINE) {
                  this.buffers.push(newChar[0])
                }
                break;
              default:
                this.buffers.push(char[0])
                break;
            }
          }
        })
      } else if (type === 'end') {
        this._reader.on('end', () => {
          this.emit('end', Buffer.from(this.buffers).toString(encoding))
        })
      }
    })
  }
}

module.exports = LineReader

let lineReader = new LineReader('./1.txt')
lineReader.on('newline', (data) => {
  console.log(data);
})
lineReader.on('end', (data) => {
  console.log(data);
})
