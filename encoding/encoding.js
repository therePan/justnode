function transfer(number) {
  let arr = ['1110', '10', '10']
  let str = (number).toString(2)
  arr[2] += str.substring(str.length - 6)
  arr[1] += str.substring(str.length - 12, str.length - 6)
  arr[0] += str.substring(0, str.length - 12).padStart(4, '0')

  return arr.map(item => parseInt(item,2).toString(16)).join(',')
}

console.log(transfer(0x07FF));