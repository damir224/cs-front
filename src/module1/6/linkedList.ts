import assert from 'node:assert';
import test from 'node:test';

interface LLNode {
    value: number;
    next: LLNode | null;
    prev: LLNode | null;
}

const generateNewNode = (
    prev: LLNode | null,
    value: number,
    next: LLNode | null = null
): LLNode => {
    const newNode = {
        value,
        prev,
        next,
    };
    if (prev) {
        prev.next = newNode;
    }
    return newNode;
};

class LinkedList {
    first: LLNode | null = null;
    last: LLNode | null = null;

    constructor() {}
    add(num: number) {
        if (this.first === null || this.last === null) {
            const newNode = generateNewNode(null, num);
            this.first = newNode;
            this.last = newNode;
        } else {
            const prevNode = this.last.prev;
            if (prevNode === null) {
                const newNode = generateNewNode(this.first, num);
                this.first.next = newNode;
                this.last = newNode;
            } else {
                const newNode = generateNewNode(this.last, num);
                this.last.next = newNode;
                this.last = newNode;
            }
        }
    }
    [Symbol.iterator]() {
        let currentNode = this.first;
        return {
            next() {
                if (currentNode === null) {
                    return {
                        done: true,
                        value: null,
                    };
                }

                const node = {
                    done: false,
                    value: currentNode.value,
                };
                currentNode = currentNode.next;
                return node;
            },
        };
    }
}

test.describe('test Linked List', () => {
    test('add method', (t) => {
        const list = new LinkedList();

        list.add(1);
        list.add(2);
        list.add(3);

        assert.equal(list.first?.value, 1);
        assert.equal(list.last?.value, 3);
        assert.equal(list.first?.next?.value, 2);
        assert.equal(list.first?.next?.prev?.value, 1);
    });

    test('Symbol.iterator method', (t) => {
        const list = new LinkedList();

        let valuesListData = [1, 2, 3];

        valuesListData.forEach((value) => {
            list.add(value);
        });

        let count = 0;

        const valuesList = [];
        for (const value of list) {
            valuesList.push(value);
            count++;
        }

        assert.strictEqual(count, valuesListData.length);
        assert.deepEqual(valuesList, valuesListData);
    });
});
