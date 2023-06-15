// const randomInt = random(0, 100);

// console.log(randomInt.next());
// console.log(randomInt.next());
// console.log(randomInt.next());
// console.log(randomInt.next());

function random(start:number, end:number) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return {
              done: false,
              value: getRandomNumber(start, end)
            }
        },
    };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default random
