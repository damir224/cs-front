const encode = require('../encode/index.js');

const schema = [
    [3, 'number'], // 3 бита число
    [2, 'number'], // 3 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii'], // 16 бит 2 аски символа
];
const data = encode([2, 3, true, false, 'ab'], schema);
function convertToNumber(length, byteArray, startPoint) {
    let count = 0;
    for (let index = startPoint; index < startPoint + length; index++) {
        const element = byteArray[index];
        count = (count << 1) | element;
    }
    return count;
}

const decode = (data, schema) => {
    let startPoint = 0;
    const result = [];
    for (let index = 0; index < schema.length; index++) {
        const [bitAmount, type] = schema[index];
        if (type === 'number') {
            const currentResult = convertToNumber(bitAmount, data, startPoint);
            result.push(currentResult);
            startPoint += bitAmount;
        }
        if (type === 'boolean') {
            const currentResult = convertToNumber(bitAmount, data, startPoint);
            result.push(Boolean(currentResult));
            startPoint += bitAmount;
        }
        if (type === 'ascii') {
            const firstAsciiSymbol = convertToNumber(8, data, startPoint);
            startPoint += 8;
            const secondAsciiSymbol = convertToNumber(8, data, startPoint);
            startPoint += 8;
            const currentResult = String.fromCharCode(
                firstAsciiSymbol,
                secondAsciiSymbol
            );
            result.push(currentResult);
        }
    }
    return result;
};
// Если данные не подходят схеме - выбрасывать исключения с пояснением
console.log(decode(data, schema)); // [2, 3, true, false, 'ab']
