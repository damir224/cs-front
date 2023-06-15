console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]

function mapSeq<T>(iter: Iterable<T>, cbArr: Array<(el: number) => number>) {
    const innerIter = iter[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const { done, value } = innerIter.next();
            if (done) {
                return { done, value: undefined };
            }

            let currentValue = value;
            for (const cb of cbArr) {
                currentValue = cb(currentValue);
            }

            return { done: false, value: currentValue };
        },
    };
}

// ## Необходимо написать функцию, которая принимала бы любой Iterable объект и Iterable
// с функциями и возвращала итератор где каждому элементу левого Iterable последовательно применяются
// все функции из правого
