console.log(...seq([1, 2], new Set([3, 4]), Array.from('bla'))); // 1, 2, 3, 4, 'b', 'l', 'a'

function seq(...iterators: Iterable<any>[]) {
    const iteratorsCount = iterators.length;
    let currentIteratorsNumber = 0;
    let innerIter = iterators[currentIteratorsNumber][Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const { done, value } = innerIter.next();

            if (done && currentIteratorsNumber >= iteratorsCount - 1) {
                return { done, value: undefined };
            }
            if (done) {
                innerIter =
                    iterators[++currentIteratorsNumber][Symbol.iterator]();
                return innerIter.next();
            }
            return { done: false, value: value };
        },
    };
}

// if (done && currentIterCursor === argsLength - 1) {

// ## Необходимо написать функцию seq, которая бы принимала множество Iterable
// объектов и возвращала итератор по их элементам
