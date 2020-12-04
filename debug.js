class  Debug {
  constructor() {
    this.name = 'xiaoxiao'
    console.log(123);
  }
  say() {
    debugger
    console.log(this.name);
  }
}

const debug = new Debug()
debug.say()