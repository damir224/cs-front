const generateNewNode = (prevNode, newValue, nextNode = null) => ({
    prev: prevNode,
    value: newValue,
    next: nextNode,
});

function LinkedList() {
    this.first = null;
    this.last = null;

    return {
        add(newValue) {
            if (this.last === null && this.first === null) {
                const newNode = generateNewNode(null, newValue);
                this.first = newNode;
                this.last = newNode;
            } else {
                const prevNode = this.last.prev;
                if (prevNode === null) {
                    const newNode = generateNewNode(this.first, newValue);
                    this.first.next = newNode;
                    this.last = newNode;
                } else {
                    const newNode = generateNewNode(this.last, newValue);
                    this.last.next = newNode;
                    this.last = newNode;
                }
            }
        },
        first: this.first,
        last: this.last,
        [Symbol.iterator]: function () {
            let currentNode = this.first;

            return {
                next() {
                    if (currentNode === null) {
                        return {
                            done: true,
                        };
                    } else {
                        const node = {
                            done: false,
                            value: currentNode.value,
                        };
                        currentNode = currentNode.next;
                        return node;
                    }
                },
            };
        },
    };
}

const list = LinkedList();

list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);

console.log(list.first.value); // 1
console.log(list.last.value); // 3
console.log(list.first.next.value); // 2
console.log(list.first.next.prev.value); // 1
console.log(list.last.prev.prev.value); // 4
console.log(list.last.prev.prev.prev.value); // 3
console.log(list.last.prev.prev.prev.next.value); // 4
console.log(list.last.value); // 6
console.log(list.last.prev.value); // 5
console.log(list.last.prev.next.value); // 6

for (const value of list) {
    console.log(value);
}
