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
console.log(collapseRecursion(obj));

interface Obj {
    [key: string]: number | number[] | Obj;
}
function collapseRecursion(obj: Obj) {
    const resultObj: Obj = {};

    const recursion = (innerObj: Obj | number[], currentPath: string) => {
        for (const key in innerObj) {
            const element = Array.isArray(innerObj)
                ? innerObj[Number(key)]
                : innerObj[key];
            if (typeof element === 'object' && typeof element !== 'number') {
                recursion(element, currentPath + key + '.');
            } else {
                const currentKey = currentPath + key;
                resultObj[currentKey] = element;
            }
        }
    };
    recursion(obj, '');
    return resultObj;
}

export {};
