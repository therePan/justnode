let fs = require('fs')
let EventEmitter = require('events')

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super(path, options)
    this.path = path
    this.flags = options.flags || 'w';
    this.mode = options.mode || ' 0o666';
    this.start = options.start || 0;
    this.encoding = options.encoding || 'utf8';
    this.autoClose = options.autoClose;
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.pos = this.start;
    this.buffers = [] //缓存区
    this.writing = false;
    this.length = 0 //表示缓存区字节长度
    this.open()
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      this.fd = fd
      if (err) {
        if (this.autoClose) {
          this.destroy()
        }
        this.emit('error', err)
      }
      this.emit('open')
    })
  }

  write(chunk, encoding, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding)
    let len = chunk.length
    //缓存区的长度加上当前写入的长度
    this.length += len;
    if (this.writing) { //表示正在底层写数据，则当前数据必须放到缓存区里
      this.buffers.push({
        chunk,
        encoding,
        cb
      })

      //判断当前最新的缓存区大小是小于最高水位线

    } else { //直接调用底层方法进行写入
      this.writing = true
      //在底层写完后要清空缓存区
      this._write(chunk, encoding, () => this.clearBuffer()) //
    }
    //判断当前缓存区是否小于最高水位线
    let ret = this.length < this.highWaterMark
    return ret
  }

  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        this._write(chunk, encoding, () => this.clearBuffer()) //
      })
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, byteWritten) => {
      if (err) {
        if (this.autoClose) {
          this.destroy()
        }
        this.emit('error', err)
      }
      this.pos += byteWritten
      //写入多少字节缓存区减少多少字节
      this.length -= byteWritten 
      cb & cb()
    })
  }

  clearBuffer() {
    let data = this.buffers.shift()
    if (data) {
      this._write(data.chunk, data.encoding, () => this.clearBuffer())
    } else {
      this.writing = false
      this.emit('drain')
    }
  }


  destroy() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

module.exports = WriteStream