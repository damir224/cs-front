function createBitAccessor(input: Uint8Array) {
    return {
        get(indexElement: number, index: number): number {
          const currentNumber = input[indexElement];
          // first set needed bit to left position 
          // second use & operator to get it value
          return (currentNumber >>> index) & 1;
        },
        set(indexElement: number, index: number, number: number): number {
          const currentNumber = input[indexElement];
          // first move number - 0...01 to needed position
          // second use ^ operator to change needed bit in currentNumber
            return (1 << index) ^ currentNumber;
        },
    };
}

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitAccessor.set(0, 1, 0)); //
console.log(bitAccessor.get(0, 1)); // 0
