// WIP
function Structure(arr) {
    const length = arr.reduce((acc, cur) => (acc += cur[2] ?? 16), 0);
    const buffer = new ArrayBuffer(length);
    const byteArray = new Uint8Array(buffer);

    console.log('byteArray', byteArray);

    return {
        set(key, value) {
            const [fieldValue, type, number] = arr.find(([f]) => f === key);
            let offset = 0
            switch (type) {
                case 'utf16':
                    for (const char of key) {
                        const asciiSymbol = char.charCodeAt(0);
                        console.log('asciiSymbol', asciiSymbol);

                        if(offset > number) {
                          throw new Error()
                        }
                    }
                    let result = '';
                    // for (let i = 0; i < length; i++) {
                    //     const charCode = this.view.getUint16(offset + i * 2);
                    //     if (charCode === 0) {
                    //         break;
                    //     }
                    //     result += String.fromCharCode(charCode);
                    // }
                    return result;
                case 'u16':
                // return store.getUint16(field.offset);
            }
            return key;
        },
        get(key) {
            return key;
        },
    };
}

const jackBlack = Structure([
    ['name', 'utf16', 10], // Число - это максимальное количество символов
    ['lastName', 'utf16', 10],
    ['age', 'u16'], // uint16
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

console.log(jackBlack.get('name')); // 'Jack'
