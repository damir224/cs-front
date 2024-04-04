// # ДЗ к лекции База#9

import assert from 'node:assert';
import test from 'node:test';

// ## Реализовать класс для реализации двусторонней очереди на основе связного списка типизированных массивов

class Dequeue<T extends Uint8ArrayConstructor> {
    #buffer: TypedArray;
    length = 0;
    #left: number = 0;
    #right: number = 0;
    constructor(type: T, capacity: number) {
        this.#buffer = new type(capacity);
        const middleIndex = this.#buffer.length / 2;
        this.#left = middleIndex;
        this.#right = middleIndex + 1;
    }
    pushLeft(num: number) {
        this.#buffer[this.#left--] = num;
        return ++this.length;
    }
    popLeft(): number {
        const popValue = this.#buffer[++this.#left];
        this.length--;
        return popValue;
    }
    pushRight(num: number) {
        this.#buffer[this.#right++] = num;
        return ++this.length;
    }
    popRight(): number {
        const popValue = this.#buffer[--this.#right];
        this.length--;
        return popValue;
    }
    get buffer() {
        return this.#buffer;
    }
}

test('test Dequeue class', () => {
    const dequeue = new Dequeue(Uint8Array, 64);
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
