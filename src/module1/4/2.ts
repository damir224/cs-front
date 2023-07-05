// ## Реализовать двустороннюю очередь

class NodeQueue<V> {
    value;
    next;
    prev;
    constructor(value: V, next: NodeQueue<V>, prev: NodeQueue<V>) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class Queue<T> {
    queue: NodeQueue<T> = null;
    head: T = null;
    private tail: NodeQueue<T> = null;
    constructor(initialValue = null) {
        this.queue = new NodeQueue<T>(initialValue, null, null);
        this.head = initialValue;
        this.tail = initialValue;
    }
    push(value: T) {
        const currentNode = new NodeQueue<T>(value, null, this.tail);
        if (this.queue.value === null) {
            this.queue = currentNode;
            this.head = value;
            this.tail = currentNode;
        } else {
            this.tail.next = currentNode;
            this.tail = currentNode;
        }
    }
    pop() {
        if (this.queue === null) {
            throw Error('Queue is empty');
        }
        const firstNode = this.queue;
        const secondNode = this.queue.next;

        if (secondNode === null || secondNode.value === null) {
            this.queue = null;
            this.head = null;
            this.tail = null;
            return firstNode.value;
        }
        const currentTail = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return currentTail.value;
    }

    unshift(value: T) {
        const currentNode = new NodeQueue<T>(value, this.queue, null);
        if (this.queue.value === null) {
            this.queue = currentNode;
            this.head = value;
            this.tail = currentNode;
        } else {
            this.head = value;
            this.queue = currentNode;
        }
    }

    shift() {
        if (this.queue === null) {
            throw Error('Queue is empty');
        }
        const firstNode = this.queue;
        const lastNode = this.tail;

        if (firstNode === lastNode) {
            this.queue = null;
            this.head = null;
            this.tail = null;
            return firstNode.value;
        }
        this.queue = this.queue.next;
        return this.head;
    }
}

const dequeue = new Queue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop()); // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop()); // 10
console.log(dequeue.pop()); // Exception

export {}
