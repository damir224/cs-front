console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]

function zip(...iterables: Iterable<any>[]) {
    const innerIters = Array.from(iterables, (iterable) =>
        iterable[Symbol.iterator]()
    );

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const zipArr = [];
            for (const innerIter of innerIters) {
                const { done, value } = innerIter.next();
                if (done) {
                    return { done, value: undefined };
                }
                zipArr.push(value);
            }
            return { done: false, value: zipArr };
        },
    };
}
// ## Необходимо написать функцию zip, которая бы принимала множество
// Iterable объектов и возвращала итератор по кортежам их элементов
