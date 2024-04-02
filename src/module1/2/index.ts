// # ДЗ к лекции База#2

// ## Придумать простой формат "байткода" и написать для него интерпретатор

const instructions = {
    'SET A': 0,
    'PRINT A': 1,
    'IFN A': 2,
    RET: 3,
    'DEC A': 4,
    JMP: 5,
};

const program = [
    // Ставим значения аккумулятора
    'SET A',
    // В 10
    10,
    // Выводим значение на экран
    'PRINT A',
    // Если A равно 0
    'IFN A',
    // Программа завершается
    // instructions['RET'],
    // И возвращает 0
    0,
    // Уменьшаем A на 1
    'DEC A',
    // Устанавливаем курсор выполняемой инструкции
    'JMP',
    // В значение 2
    2,
];

// Выведет в консоль
// 10
// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// И вернет 0спроситты
execute(program);

function execute(program) {
    let a = null;
    let i = 0;
    let condition = false;
    console.log(program);
    while (i < program.length) {
        const instruction = program[i];
        switch (instructions[instruction]) {
            case 0:
                a = program[i + 1];
                i += 1;
                break;
            case 1:
                console.log(a);
                break;
            case 2:
                if (a === program[i + 1]) {
                    return 0;
                } else {
                    i += 1;
                }
                break;
            // case 3:
            //   console.log(2, a);
            //   return 0;
            case 4:
                a -= 1;
                break;
            case 5:
                i = program[i + 1] - 1;
                break;

            default:
                return;
        }
        i++;
    }
}
