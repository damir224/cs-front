// ## Написать класс, который представляет числа в формате BCD 841

// Кодироваться цифры должны внутри чисел JS.
// Каждое число должно состоять из 7-ми цифр в формате BCD для эффективного кодирования в SMI.
import assert from 'node:assert';

class BCD {
    #numbers: number[] = [];
    #number: number = 0;
    #bcd:number[]= [];
    #BCD_BIT_LEN = 4;
    
    constructor(num: number) {
        this.#number = num
        this.#bcd = this.convertToBcd(num)
    }
    valueOf() {
      // let decimal = this.#number;
  
      // for (let shift = 0; decimal > 0; shift += this.#BCD_BIT_LEN) {
      //   const digit = decimal % 10;
      //   this.#bcd |= digit << shift;
      //   decimal = Math.floor(decimal / 10);
      // }
      // console.log('this.#bcd', this.#bcd)
      return this.#bcd;
    }
    convertToBcd (decimal:number) {
      let shift = 0
      const newBcd = new Array(8).fill(null).map(()=>[])
      console.log('newBcd', newBcd)
      let count = 0
      while(decimal) {
        const digit = decimal % 10
        // newBcd.push( digit << shift)
        newBcd[count] = digit
        count++
        decimal = Math.floor(decimal / 10)
        
        //visual debug
        // console.log('digit',digit, binary(digit))
        // console.log('this.#b', newBcd)
        // shift+=4
      }
      return newBcd
    }
}

const n = new BCD(655361);

console.log(n.valueOf()); // 0b01100101010100110110 или 415030
// console.log(n.get(0)); // 6
// console.log(n.get(1)); // 3

// console.log(n.get(-1)); // 6
// console.log(n.get(-2)); // 5



assert.equal(1,1)
const bb = -1
// const binaryNum = binary(bb)
// console.log('binaryNum', binaryNum)
// const doublebinaryNum = getDoubleStr2(bb)
// console.log('doublebinaryNum', doublebinaryNum)
// const leftShift = binary(circularLeftShift(binaryNum,2))
// const rightShift = binary(circularRightShift(binaryNum,2))
// console.log('leftShift', leftShift)
// console.log('rightShift', rightShift)
// console.log('getDoubleStr2(bb)', getDoubleStr2(bb))
// 4 => 0b0000_0000_0000_0000_0000_0000_0000_0100
function binary(num:number) {
  const str = new Uint32Array([num])[0].toString(2);
  return '0b' + str.padStart(32, '0').replace(/(.{4})(?!$)/g, '$1_');
}
// 0b0000_0000_0000_0000_0000_0000_0000_0100 => 4
function parseBinary(str) {
  return parseInt(str.replace(/^0b|_/g, ''), 2) >> 0;
}

// 0b0000_0000_0000_0000_0000_0000_0000_0100, 2 => // 0b0000_0000_0000_0000_0000_0000_0001_0000
function circularLeftShift(num, shift) {
  return num << shift | num >>> (32 - shift);
}

// 0b0000_0000_0000_0000_0000_0000_0000_0100, 2 => // 0b0000_0000_0000_0000_0000_0000_0000_0001
function circularRightShift(num, shift) {
  return num >>> shift | num << (32 - shift);
}


function getDoubleStr2(num) {
  const data = new DataView(new ArrayBuffer(8));
  data.setFloat64(0, num, false);

  let bits = '';

  for (let i = 0; i < 8; i++) {
    const byte = data.getUint8(i).toString(2).padStart(8, '0');
    bits += byte;
  }

  return '0b' + bits.replace(/(.{4})(?!$)/g, '$1_');
}
