function createBitGetter(input: Uint8Array) {
    return {
        get(indexElement: number, index: number): number {
          const currentNumber = input[indexElement];
          // first set needed bit to left position 
          // second use & operator to get it value
          return (currentNumber >>> index) & 1;
        },
    };
}

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0
