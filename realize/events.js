function EventEmitter() {
  this.events = {}
  this._maxListeners = 10
}

EventEmitter.prototype.on = EventEmitter.addListener = function (type, listener) {
  if (this.events[type]) {
    if (this._maxListeners !== 0 && this.events[type].length > this._maxListeners) {
      console.error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this.events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`);
    }
    this.events[type].push(listener)
  } else {
    this.events[type] = [listener]
  }
}

EventEmitter.prototype.once = function (type, listener) {
  let wrapper = (...args) => {
    listener(...args)
    this.removeListener(type, wrapper)
  }
  this.on(type, wrapper)
}

EventEmitter.prototype.removeListener = function (type, listener) {
  if (this.events[type]) {
    this.events[type] = this.events[type].filter(l => l !== listener)
  }
}

EventEmitter.prototype.removeAllListener = function (type) {
  delete this.events[type]
}

EventEmitter.prototype.setMaxListeners = function (length) {
  this._maxListeners = length
}

EventEmitter.prototype.listeners = function (type) {
  retrn this.events[type]
}

EventEmitter.prototype.emit = function (type, ...args) {
  this.events[type] && this.events[type].forEach((listener) => listener(...args))
}

module.exports = EventEmitter