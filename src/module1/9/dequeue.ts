// # ДЗ к лекции База#9

import assert from 'node:assert';
import test from 'node:test';

// ## Реализовать класс для реализации двусторонней очереди на основе связного списка типизированных массивов

class Dequeue<T extends TypedArrayType> {
    #buffer: TypedArray;
    #capacity: number;
    length = 0;
    #left: number = 0;
    #right: number = 0;
    #arrayType: TypedArrayType;
    constructor(type: T, capacity: number) {
        this.#arrayType = type;
        this.#capacity = capacity;
        this.#buffer = new type(capacity);
        this.#updatePointers();
    }
    pushLeft(num: number) {
        if (this.#left < 0) {
            this.#increaseBufferSize();
        }
        this.#buffer[this.#left--] = num;
        return ++this.length;
    }
    popLeft(): number {
        const popValue = this.#buffer[++this.#left];
        this.length--;
        return popValue;
    }
    pushRight(num: number) {
        if (this.#right > this.#buffer.length - 1) {
            this.#increaseBufferSize();
        }
        this.#buffer[this.#right++] = num;
        return ++this.length;
    }
    popRight(): number {
        const popValue = this.#buffer[--this.#right];
        this.length--;
        return popValue;
    }

    #increaseBufferSize() {
        const oldCapacity = this.#capacity;
        this.#capacity = oldCapacity * 2;
        const newBuffer = new this.#arrayType(this.#capacity);
        let newIndex = Math.floor((this.#capacity - oldCapacity) / 2);
        this.#buffer.forEach((item) => {
            newBuffer[newIndex++] = item;
        });

        this.#buffer = newBuffer;
        if (this.#left < 0) {
            this.#left = Math.floor((this.#capacity - oldCapacity) / 2) - 1;
        } else {
            this.#right = newIndex;
        }
    }
    #updatePointers() {
        const middleIndex = Math.floor(this.#buffer.length / 2);
        this.#left = middleIndex;
        this.#right = middleIndex + 1;
    }
}

test('test Dequeue class', () => {
    const dequeue = new Dequeue(Uint8Array, 4);
    assert.equal(dequeue.pushLeft(1), 1);
    assert.equal(dequeue.pushLeft(2), 2);
    assert.equal(dequeue.pushLeft(3), 3);

    assert.equal(dequeue.length, 3);
    assert.equal(dequeue.popLeft(), 3);

    assert.equal(dequeue.pushRight(4), 3);
    assert.equal(dequeue.pushRight(5), 4);
    assert.equal(dequeue.pushRight(6), 5);

    assert.equal(dequeue.popRight(), 6);
});
