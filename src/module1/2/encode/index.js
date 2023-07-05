const schema = [
    [3, 'number'], // 3 бита число
    [2, 'number'], // 3 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii'], // 16 бит 2 аски символа
];

function convertToByteArray(num, length, byteArray, startPoint) {
    const originalNum = num;
    let count = startPoint + length - 1;
    while (num > 0 && count >= 0) {
        byteArray[count] = num & 1;
        count--;
        num >>>= 1;
    }
    if (count < startPoint && num > 0) {
        throw Error(
            `This value: ${originalNum}, is not fit to bit amount(${length})`
        );
    }
}

const encode = (array, schema) => {
    const sum = schema.reduce((acc, cur) => (acc += cur[0]), 1);
    const buffer = new ArrayBuffer(sum);
    const byteArray = new Uint8Array(buffer, 1);

    let startPoint = 0;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const [bitAmount, type] = schema[index];

        if (typeof element === type) {
            convertToByteArray(element, bitAmount, byteArray, startPoint);
            startPoint += bitAmount;
        }
        if (typeof element === 'string' && type === 'ascii') {
            const firstAsciiSymbol = element.charCodeAt(0);
            convertToByteArray(firstAsciiSymbol, 8, byteArray, startPoint);
            startPoint += 8;
            const secondAsciiSymbol = element.charCodeAt(1);
            convertToByteArray(secondAsciiSymbol, 8, byteArray, startPoint);
            startPoint += 8;
        }
    }
    return byteArray;
};
// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.
const data = encode([2, 3, true, false, 'ab'], schema);
console.log('data', data);

module.exports = encode
