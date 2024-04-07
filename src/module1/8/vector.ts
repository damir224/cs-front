// # ДЗ к лекции База#8

import assert from 'node:assert';
import test from 'node:test';

// ## Реализовать универсальный класс вектора для всех типизированных массивов
// ## Реализовать итератор values для вектора с учетом того, что буфер может вырасти

class Vector<T extends TypedArrayType> {
    capacity: number;
    length: number = 0;
    buffer: TypedArray;
    #arrayType: TypedArrayType;
    constructor(buffer: T, { capacity }: { capacity: number }) {
        this.#arrayType = buffer;
        this.buffer = new buffer(capacity);
        this.capacity = capacity;
    }

    push(num: number) {
        if (this.capacity <= this.length + 1) {
            this.#increaseCapacity();
        }
        this.buffer[this.length++] = num;
        return this.length;
    }
    pop() {
        const currentValue = this.buffer[--this.length];
        return currentValue;
    }
    shrinkToFit() {
        const newCapacity = this.length;
        const newBuffer = new this.#arrayType(newCapacity);
        for (let i in this.buffer) {
            newBuffer[i] = this.buffer[i];
        }
        this.buffer = newBuffer;
        this.capacity = newCapacity;
    }

    #increaseCapacity() {
        const newCapacity = this.capacity * 2;
        const newBuffer = new this.#arrayType(newCapacity);
        for (let i in this.buffer) {
            newBuffer[i] = this.buffer[i];
        }
        this.buffer = newBuffer;
        this.capacity = newCapacity;
    }

    values() {
        let that = this;
        let currentIndex = 0;
        return {
            next() {
                if (currentIndex === that.length) {
                    return { done: true, value: undefined };
                }
                return {
                    done: false,
                    value: that.buffer[currentIndex++],
                };
            },
        };
    }
}

test.describe('test Vector class', () => {
    let vector: Vector<Int32ArrayConstructor>;

    test.before(() => {
        vector = new Vector(Int32Array, { capacity: 4 });
    });

    test('push method', () => {
        assert.strictEqual(vector.push(11), 1); // Возвращает длину - 1
        assert.strictEqual(vector.push(21), 2); // 2
        assert.strictEqual(vector.push(31), 3); // 3
        assert.strictEqual(vector.push(41), 4); // 4
        assert.strictEqual(vector.push(5), 5); // 5 Увеличение буфера

        assert.deepEqual(
            Array.from(vector.buffer),
            [11, 21, 31, 41, 5, 0, 0, 0]
        );

        assert.strictEqual(vector.capacity, 8); // 8
        assert.strictEqual(vector.length, 5); // 5
    });

    test('pop method', (t) => {
        assert.strictEqual(vector.pop(), 5); // Удаляет с конца, возвращает удаленный элемент - 5
        assert.strictEqual(vector.pop(), 41); // Удаляет с конца, возвращает удаленный элемент - 41
        assert.strictEqual(vector.capacity, 8); // 8
        assert.strictEqual(vector.push(41), 4); // 4
    });

    test('shrinkToFit method', (t) => {
        vector.shrinkToFit(); // Новая емкость 4
        assert.strictEqual(vector.capacity, 4); // 4
    });

    test('class buffer', (t) => {
        const arrBuffer = new Int32Array(4);
        arrBuffer[0] = 11;
        arrBuffer[1] = 21;
        arrBuffer[2] = 31;
        arrBuffer[3] = 41;

        assert.deepEqual(vector.buffer, arrBuffer); // Ссылка на ArrayBuffer
    });

    test('iterator', (t) => {
        const vec = new Vector(Int32Array, { capacity: 1 });
        const iteratorValuesData = [1, 2, 3];
        const i = vec.values();
        iteratorValuesData.forEach((value) => vec.push(value));

        const iteratorValues = [];
        let done = false;
        while (done === false) {
            const node = i.next();
            if (node.done) {
                done = true;
            } else {
                iteratorValues.push(node.value);
            }
        }

        assert.deepEqual(iteratorValues, iteratorValuesData);
    });
});
