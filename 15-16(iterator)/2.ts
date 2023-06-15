import random from './1';

const randomInt = random(0, 100);

// console.log([...take(randomInt, 15)]);

function take<T>(iterator: Iterable<T>, number: number): IterableIterator<T> {
    const innerIter = iterator[Symbol.iterator]();
    let count = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (count >= number) {
                return {
                    done: true,
                    value: undefined,
                };
            }
            count++;
            return innerIter.next();
        },
    };
}

export default take
