import random from './1';
import take from './2';
import filter from './3';

const randomInt = random(0, 100);

console.log([
    ...take(enumerate(filter(randomInt, (num: number) => num > 90)), 2),
]); // [[0, ...], [1, ...], [2, ...]]

function enumerate<T>(iterator: Iterable<T>) {
    const innerIter = iterator[Symbol.iterator]();
    let count = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
          let currentInnerIter = innerIter.next();
          if(currentInnerIter.done) {
            return {
                done: true,
                value: undefined,
            };
          }
          return {
              done: false,
              value: [count++, currentInnerIter.value],
          };

        },
    };
}
// ## Необходимо написать функцию enumerate, которая принимает любой Iterable объект и возвращает итератор по парам (номер итерации, элемент)
