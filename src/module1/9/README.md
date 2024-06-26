# ДЗ к лекции База#9

## Реализовать класс для реализации двусторонней очереди на основе связного списка типизированных массивов

```js
// Тип массива и его емкость
const dequeue = new Dequeue(Uint8Array, 64);

vec.pushLeft(1); // Возвращает длину - 1
vec.pushLeft(2); // 2
vec.pushLeft(3); // 3

console.log(vec.length); // 3
vec.popLeft();           // Удаляет с начала, возвращает удаленный элемент - 1

vec.pushRight(4);
vec.pushRight(5);
vec.pushRight(6);

vec.popRight();           // Удаляет с конца, возвращает удаленный элемент - 6
```

## Реализовать поддержку структур и кортежей в JS на основе ArrayBuffer

```js
const Skills = new Structure({
  singing: Structure.U8, // Unsigned число 8 бит
  dancing: Structure.U8,
  fighting: Structure.U8
});

// Кортеж из 3-х чисел
const Color = new Structure.Tuple(Structure.U8, Structure.U8, Structure.U8);

const Person = new Structure({
  firstName: Structure.String('ASCII'), // Строка в кодировке ASCII
  lastName: Structure.String('ASCII'),
  age: Structure.U(7),                  // Unsigned число 7 бит,
  skills: Skills,
  color: Color
});

const bob = Person.create({
  firstName: 'Bob', // Тут придется сконвертировать UTF-16 в ASCII
  lastName: 'King',
  age: 42,
  skills: Skills.create({singing: 100, dancing: 100, fighting: 50}),
  color: Color.create(255, 0, 200)
});

console.log(bob.size); // Количество занимаемых байт конкретной структурой

// "Свойства" структуры реализуются через геттеры/сеттеры.
// Сама структура работает как View над данными в ArrayBuffer.

console.log(bob.buffer);         // ArrayBuffer
console.log(bob.firstName);      // Тут идет обратная конвертация в UTF-16 из ASCII
console.log(bob.skills.singing); // 100

const bobClone = Person.from(bob.buffer.slice());
```
