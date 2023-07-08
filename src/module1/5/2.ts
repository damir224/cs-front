// ## Валидация скобочных групп

// Необходимо написать функцию, которая бы принимала строку и возвращала true,
// если у каждого из символов `{`, `[` и `(` есть своя закрывающая пара и они стоят в правильной последовательности.

console.log(isValid('(hello{world} and [me])')); // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')')); // false

const BRACKETS = {
    '(': true,
    ')': true,
    '{': true,
    '}': true,
    '[': true,
    ']': true,
};
const MAP = {
    ')': '(',
    '}': '{',
    ']': '[',
};

function isValid(str: string) {
    const stack: string[] = [];

    for (const letter of str) {
        if (BRACKETS[letter]) {
            if (MAP[letter]) {
                if (stack.pop() !== MAP[letter]) {
                    return false;
                }
            } else {
                stack.push(letter);
            }
        }
    }
    return stack.length === 0;
}

export {}
