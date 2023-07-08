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
console.log(collapseStack(obj));
function collapseStack(obj: Object) {
    const resultObj = {};
    const stack = [];
    stack.push([obj, '']);

    while (stack.length) {
        const currentValue = stack.pop();
        for (const key in currentValue[0]) {
            const element = currentValue[0][key];
            if (typeof element === 'object') {
                stack.push([element, currentValue[1] + key + '.']);
            } else {
                const currentKey = currentValue[1] + key;
                resultObj[currentKey] = element;
            }
        }
    }
    return resultObj;
}

export {}
