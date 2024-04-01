// # ДЗ к лекции База#4

// ## Написать класс, который представляет числа в формате BCD 841

// Кодироваться цифры должны внутри чисел JS.
// Каждое число должно состоять из 7-ми цифр в формате BCD для эффективного кодирования в SMI.

class BCD {
  #numbers = []; // [18, ]
  #number = 0;
  #bcd = 0;
  constructor(num) {
      this.#number = num;
      this.#bcd = this.convertToBCD(this.#number); /// 0001_0010_0011
  }

  convertToBCD(num) {
      let currentBcd = 0;
      let shift = 0;

      while (num > 0) {
          const digit = num % 10; // 1
          num = Math.floor(num / 10);

          const bcdDigit = digit << shift;
          currentBcd = bcdDigit | currentBcd;

          shift += 4;
      }

      return currentBcd;
  }
  valueOf() {
      return this.#bcd;
  }

  get(index) {
      // рабочее решение # 1:
      // if (index < 0) {
      //     let shift = 4;
      //     let count = 1;
      //     index = ~index + 1;

      //     while (true) {
      //         const bcdDigit = this.#bcd << shift;
      //         const firstBit =
      //             bcdDigit & 0b1111_0000_0000_0000_0000_0000_0000_0000;
      //         if (firstBit > 0 && count++ === index) {
      //             return firstBit >>> 28;
      //         }
      //         shift += 4;
      //     }
      // }
      // return (this.#bcd >> (index * 4)) & 0b1111;
      // ============
      // рабочее решение # 2:
      const rank = Math.floor(Math.log10(Math.abs(this.#number))) + 1;
      index = index < 0 ? rank + index : index;

      return (this.#bcd >> (index * 4)) & 0b1111;
  }
}
const n = new BCD(65536);

// console.log(n.valueOf()); // 0b01100101010100110110 или 415030
// console.log('index: 0',n.get(0)); // 6
// console.log('index: 1',n.get(1)); // 3
// console.log('index: 2',n.get(2)); // 3

// console.log('index: -1',n.get(-1)); // 6
// console.log('index: -2',n.get(-2)); // 5
// console.log('index: -2',n.get(-2)); // 5

function binary(num) {
  const str = new Uint32Array([num])[0].toString(2);
  return '0b' + str.padStart(32, '0').replace(/(.{4})(?!$)/g, '$1_');
}

function parseBinary(str) {
  return parseInt(str.replace(/^0b|_/g, ''), 2) >> 0;
}
// let num = (2 << 4) | 1;

// console.log('binary(2)', binary(~0))
// console.log('binary(2)', binary(num))
// console.log('binary(2)', binary(circularLeftShift(num, 8)))
// console.log('binary(2)', binary(circularLeftShift(num, 12)))
// console.log('binary(2)', binary(circularLeftShift(num, 16)))
// console.log('binary(2)', binary(circularLeftShift(num, 20)))
// console.log('binary(2)', binary(circularLeftShift(num, 24)))
// console.log('binary(2)', binary(circularLeftShift(num, 28))) // 0b0001_0000_0000_0000_0000_0000_0000_0010
// console.log('binary(2)', binary(circularLeftShift(num, 28)&0b1111))


function circularLeftShift(num, shift) {
  return (num << shift) | (num >>> (32 - shift));
}

function circularRightShift(num, shift) {
  return (num >>> shift) | (num << (32 - shift));
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

// const aaa = 123 >>> 0
// const bbb = -123 >>> 0
// console.log('aaa', binary(aaa), aaa)
// console.log('bbb', binary(bbb), bbb)
// const aaa1 = 123 >> 0
// const bbb2 = -123 >> 0
// console.log('aaa1', binary(aaa1), aaa1)
// console.log('bbb2', binary(bbb2), bbb2)
