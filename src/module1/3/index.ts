import assert from "node:assert";

function fizzbuzz() {
  let value = 0n;
  return {
    next: () => {
      value += 1n;
      if (value % 3n === 0n && value % 5n === 0n) {
        return "FizzBuzz";
      }
      if (value % 3n === 0n) {
        return "Fizz";
      }
      if (value % 5n === 0n) {
        return "Buzz";
      }
      return value;
    },
  };
}

const myFizzBuzz = fizzbuzz();

assert.equal(myFizzBuzz.next(), 1n);
assert.equal(myFizzBuzz.next(), 2n);
assert.equal(myFizzBuzz.next(), 'Fizz');
assert.equal(myFizzBuzz.next(), 4n);
assert.equal(myFizzBuzz.next(), 'Buzz');
assert.equal(myFizzBuzz.next(), 'Fizz');
assert.equal(myFizzBuzz.next(), 7n);
assert.equal(myFizzBuzz.next(), 8n);
assert.equal(myFizzBuzz.next(), 'Fizz');
assert.equal(myFizzBuzz.next(), 'Buzz');
assert.equal(myFizzBuzz.next(), 11n);
assert.equal(myFizzBuzz.next(), 'Fizz');
assert.equal(myFizzBuzz.next(), 13n);
assert.equal(myFizzBuzz.next(), 14n);
assert.equal(myFizzBuzz.next(), 'FizzBuzz');
assert.equal(myFizzBuzz.next(), 16n);
assert.equal(myFizzBuzz.next(), 17n);
assert.equal(myFizzBuzz.next(), 'Fizz');
