let EventEmitter = require('events')
let fs = require('fs')

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path;
    this.flags = options.flags || 'r';
    this.mode = options.mode || '0o666';
    this.autoClose = options.autoClose || true
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.start = options.start || 0;
    this.encoding = options.encoding || 'utf8';
    this.end = options.end
    this.pos = this.start

    this.buffer = Buffer.alloc(this.highWaterMark)
    this.open()

    //当给这个
    this.on('newListener', (type, listener) => {
      if (type == 'data') {
        this.read()
      }
    })
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

  read() {
    if (!this.fd) {
      return this.once('open', () => this.read())
    }
    const howMuchToRead = Math.min(this.end - this.pos + 1, this.highWaterMark)
    fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, readByte) => {
      if (err) {
        if (this.autoClose) {
          this.destroy()
        }
        this.emit('error', err)
      } else {
        if (readByte) {
          this.pos += readByte
          let data = this.buffer.slice(0, readByte)
          data = this.encoding ? data.toString(this.encoding) : data
          this.emit('data', data)
          if (this.end && this.pos > this.end) {
            return this.endFn()
          } else {
            this.read()
          }
        } else {
          return this.endFn()
        }
      }
    })
  }

  endFn() {
    this.emit('end')
    this.destroy()
  }

  destroy() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }

}

module.exports = ReadStream