// ## Сжатие глубокого объекта

// Необходимо написать функцию, которая бы сжимала некоторый глубокий объект в плоский вид.
// Задача должна быть решена минимум двумя способами: через рекурсию и через стек. Можно, также, решить через очередь.

const obj = {
    a: {
        b: [1, 2],
        '': { c: 2 },
    },
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */

console.log(collapseQueue(obj));

function collapseQueue(obj: Object) {
    const resultObj = {};
    const queue: [Object, string][] = [[obj, '']];

    while (queue.length) {
        const [innerObj, path] = queue.shift();

        for (const key in innerObj) {
            const element = innerObj[key];
            if (typeof element === 'object') {
                queue.push([element, path + key + '.']);
            } else {
                const currentKey = path + key;
                resultObj[currentKey] = element;
            }
        }
    }

    return resultObj;
}
