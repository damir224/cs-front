import random from './1';
import take from './2';

const randomInt = random(0, 100);

// console.log([
//     ...take(
//         filter(randomInt, (el: number) => el > 30),
//         2
//     ),
// ]);

function filter<T>(
    iterator: Iterable<T>,
    predicate: (el: T) => boolean,
    count: number = 100,
): IterableIterator<T> {
    const innerIter = iterator[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let currentInnerIter = innerIter.next();

            while (true) {
              if(count-- === 0) break;
                if (
                    currentInnerIter.done ||
                    predicate(currentInnerIter.value)
                ) {
                    return currentInnerIter;
                }
                currentInnerIter = innerIter.next();
            }
            return {
              done: true,
              value: undefined
            }
        },
    };
}

export default filter
