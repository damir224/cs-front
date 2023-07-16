// ## Реализовать вектор над типизированным массивом

// Вектор должен поддерживать интерфейс двусторонней очереди, как у нативных массивов JS.
type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

type TypedArrayType =
    | typeof Int8Array
    | typeof Uint8Array
    | typeof Uint8ClampedArray
    | typeof Int16Array
    | typeof Uint16Array
    | typeof Int32Array
    | typeof Uint32Array
    | typeof Float32Array
    | typeof Float64Array;

class Vector<T extends TypedArrayType> {
    #capacity: number;
    #arrayType: T;
    #buffer: TypedArray;
    length = 0;

    constructor(arrayType: T, { capacity }: { capacity: number }) {
        this.#capacity = capacity;
        this.#arrayType = arrayType;
        this.#buffer = new this.#arrayType(this.#capacity);
    }
    push(...args: number[]) {
        if (this.#capacity <= this.length + args.length) {
            this.#increaseBuffer();
        }

        for (const value of args) {
            this.#buffer[this.length++] = value;
        }
        return this.length;
    }
    pop() {
        // console.log('this.#buffe', this.#buffer)
        // console.log('this.length', this.length)
        const currentValue = this.#buffer[this.length - 1];
        this.#buffer[--this.length] = 0;
        // console.log('currentValue', currentValue)
        return currentValue;
    }
    shift() {
        const currentValue = this.#buffer[0];
        for (let index = 0; index < this.length; index++) {
            this.#buffer[index] = this.#buffer[index + 1];
        }
        this.length--;
        return currentValue;
    }
    unshift(value: number) {
        let temp = this.#buffer[0];
        this.#buffer[0] = value;
        for (let index = 1; index < this.length + 1; index++) {
            [this.#buffer[index], temp] = [temp, this.#buffer[index]];
        }
        return ++this.length;
    }

    getStat() {
        return this.#buffer;
    }

    #increaseBuffer() {
        const prevBuffer = this.#buffer;
        this.#capacity = this.#capacity * 2;
        this.#buffer = new this.#arrayType(this.#capacity);
        for (const index in prevBuffer) {
            this.#buffer[index] = prevBuffer[index];
        }
    }
}

const uint8Vector = new Vector(Uint8Array, { capacity: 2 });

uint8Vector.push(100); // 1
uint8Vector.push(20, 10); // 3

console.log(uint8Vector.pop()); // 10
console.log(uint8Vector.shift()); // 100

console.log(uint8Vector.unshift(1)); // 2
console.log(uint8Vector.length); // 2
