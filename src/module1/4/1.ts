// ## Реализовать очередь на основе связанного списка

// class Queue<T> {
//     queue = [];
//     head = null;
//     constructor(initialValue = []) {
//         this.queue = initialValue;
//         this.head = initialValue[0];
//     }
//     push(value: T) {
//         if (this.queue.length === 0) {
//             this.head = value;
//         }
//         return this.queue.push(value);
//     }
//     pop() {
//         if (this.queue.length === 1) {
//             this.head = null;
//         }else {
//           this.head = this.queue.at(1);
//         }
//         return this.queue.shift();
//     }
// }
class NodeQueue<V> {
    value;
    next;
    constructor(value: V, next: NodeQueue<V>) {
        this.value = value;
        this.next = next;
    }
}

class Queue<T> {
    queue: NodeQueue<T> = null;
    head: T = null;
    private tail: NodeQueue<T> = null;
    constructor(initialValue = null) {
        this.queue = new NodeQueue<T>(initialValue, null);
        this.head = initialValue;
        this.tail = initialValue;
    }
    push(value: T) {
        const currentNode = new NodeQueue<T>(value, null);
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

        this.queue = secondNode;
        this.head = secondNode.value;
        return firstNode.value;
    }
}

const queue = new Queue<number>();

queue.push(10);
queue.push(11);
queue.push(12);

console.log('queue.head', queue.head); // 10

console.log('queue.pop', queue.pop()); // 10

console.log('queue.head', queue.head); // 11

console.log('queue.pop', queue.pop()); // 11
console.log('queue.pop', queue.pop()); // 12
console.log('queue.pop', queue.pop()); // Exception

export {};
