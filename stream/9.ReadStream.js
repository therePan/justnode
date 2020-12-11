let EventEmitter = require('events')
let fs = require('fs')

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path;
    this.flags = options.flags || 'r';
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.start = options.start || 0;
    this.encoding = options.encoding || 'utf8';
    this.end = options.end
    this.pos = this.start

    this.length = 0
    this.flowing = true
    this.buffer = Buffer.alloc(this.highWaterMark)
    this.buffers = []
    this.open()
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      this.fd = fd
      if (err) {
        console.log(err,fd);
        if (this.autoClose) {
          this.destroy()
        }
        this.emit('error', err)
      }
      this.emit('open')
      this.read()
    })
  }

  read(n) {
    let ret
    if (n > 0 && n < this.length) {
      ret = Buffer.alloc(n)
      let index = 0
      let b
      while (undefined !== (b = this.buffers.shift())) {
        for (let i = 0; i < b.length; i++) {
          ret[index++] = b[i]
          if (index === n) {
            this.length -= n
            this.buffers.unshift(b.slice(i))
            break;
          }
        }
      }
    }
    if (this.length < this.highWaterMark) {
      fs.read(this.fd, this.buffer, 0, this.highWaterMark, this.pos, (err, bytesRead, buf) => {
        if (bytesRead) {
          // let b = this.buffer.slice(0, bytesRead)
          this.buffers.push(buf)
          this.length += bytesRead
          this.emit('readable')
        } else {
          this.emit('end')
        }
      })
    }
    return ret
  }

  destroy() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }

}

module.exports = ReadStream