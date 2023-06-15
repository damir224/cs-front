// WIP
class CustomRange {
    start;
    curStart;
    end;
    curEnd;
    currentPoint;
    direction: 'strait' | 'back' = 'strait';
    constructor(start: number | string, end: number | string) {
        this.start = start;
        this.end = end;
        this.currentPoint = typeof start === 'string' ? start.charCodeAt(0)  : start;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (typeof this.start === 'string' && typeof this.end === 'string') {
            this.curStart = this.start.charCodeAt(0);
            this.curEnd = this.end.charCodeAt(0);

            if (this.curEnd >= this.currentPoint) {
                return {
                    done: true,
                    value: undefined,
                };
            }
            const curChar = this.direction === 'strait' ? this.currentPoint++ : this.currentPoint--

            return {
                done: false,
                value: String.fromCharCode(curChar)
            };
        }
        if (Number.isInteger(this.start) && Number.isInteger(this.end)) {
            if (this.curEnd === this.currentPoint) {
                return {
                    done: true,
                    value: undefined,
                };
            }
            return {
                done: false,
                value:
                    this.direction === 'strait'
                        ? this.currentPoint++
                        : this.currentPoint--,
            };
        }
        throw new Error('start and end should be the same type');
    }

    reverse() {
        let temp = this.start;
        this.start = this.end;
        this.end = temp;
        this.direction = 'back';
    }
}

const symbolRange = new CustomRange('a', 'f');
console.log('symbolRange', symbolRange)
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
console.log('symbolRange.next()', symbolRange.next())
// console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']

const numberRange = new CustomRange(-5, 1);


// console.log(Array.from(numberRange)); // ['a', 'b', 'c', 'd', 'e', 'f']
// console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]

// ## Необходимо написать класс Range, который бы позволял создавать диапазоны
// чисел или символов, а также позволял обходить элементы Range с любого конца
