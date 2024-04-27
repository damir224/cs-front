import assert from 'node:assert';
import test from 'node:test';
process.stdout.write('\u001b[2J\u001b[0:0H');

// Задаем размер памяти в байтах, т.е. тут 100 килобайт.
// Максимальный размер стека 10 килобайт

class Memory {
    #maxMemorySize: number;
    #maxStackSize: number;
    buffer: ArrayBuffer;
    #stackIndex: number = 0;
    #stack: Int32Array;
    #heap: Int32Array;
    #heapIndex: number = 0;
    constructor(size: number, { stack }: { stack: number }) {
        this.buffer = new ArrayBuffer(size);
        this.#maxMemorySize = size;
        this.#maxStackSize = stack;
        this.#stack = new Int32Array(this.buffer, 0, this.#maxStackSize);
        this.#heap = new Int32Array(this.buffer, this.#maxStackSize);
    }

    push(newArrayBuffer: number): {
        value: number;
        deref: () => number;
        change: (newArrayBuffer: number) => void;
    } {
        const currentIndex = this.#stackIndex;

        this.#stack[currentIndex] = newArrayBuffer;
        const that = this;
        this.#stackIndex += 1;
        return {
            value: currentIndex,
            deref() {
                return that.#stack[currentIndex];
            },
            change(newArrayBuffer) {
                that.#stack[currentIndex] = newArrayBuffer;
            },
        };
    }

    pop() {
        this.#stack[--this.#stackIndex] = 0;
    }

    alloc(currentHeapSize: number) {
        const startIndex = this.#heapIndex;
        this.#heapIndex += currentHeapSize;
        const that = this;
        const currentIndex = this.#heapIndex;
        return {
            value: currentIndex,
            deref() {
                return that.#heap.subarray(startIndex, currentIndex);
            },
            change(newArrayBuffer: number) {
                that.#heap[startIndex] = newArrayBuffer;
            },
            free() {
                that.#heap[startIndex] = 0;
                that.#heapIndex -= currentHeapSize;
            },
        };
    }
}

test('test Memory', () => {
    const mem = new Memory(120, { stack: 12 });

    const arrayBuffer1 = 3490;
    const arrayBuffer2 = 3;

    const pointer1 = mem.push(arrayBuffer1); // Добавляем значение в стек, метод должен вернуть указатель на первый байт данных
    const pointer2 = mem.push(arrayBuffer2); // Добавляем еще значение в стек
    // mem.push(7); // Добавляем еще значение в стек
    assert.equal(pointer1.value, 0);
    assert.equal(pointer2.value, 1);

    assert.equal(pointer1.deref(), arrayBuffer1);
    assert.equal(pointer2.deref(), arrayBuffer2);

    const arrayBuffer3 = 77;
    pointer1.change(arrayBuffer3); // Меняем значение данных по указателю
    assert.equal(pointer1.deref(), arrayBuffer3);

    mem.pop(); // Освобождаем память arrayBuffer2
    mem.pop(); // Освобождаем память arrayBuffer3

    // Запрашиваем память заданного размера в байтах в куче
    const pointer3 = mem.alloc(3); // Возвращается указатель на первый байт // 1
    assert.equal(pointer3.value, 3);
    const pointer4 = mem.alloc(3); // Возвращается указатель на первый байт //  4
    assert.equal(pointer4.value, 6);

    const arrayBuffer4 = 1;
    pointer3.change(arrayBuffer4); // Меняем значение данных по указателю

    assert.deepEqual(pointer3.deref(), new Int32Array([1, 0, 0]));

    const pointer5 = mem.alloc(8);
    const pointer6 = mem.alloc(4);

    pointer3.free(); // Освобождаем занимаюмую память
    pointer4.free();
    pointer5.free();
    pointer6.free();
});
