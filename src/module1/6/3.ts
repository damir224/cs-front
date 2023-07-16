// ## Реализовать класс для создания хэш-таблицы

// В качестве ключей можно использовать примитивы или объекты. Алгоритм хэш-функции можно придумать любой.
// Коллизии можно решать через метод цепочек или используя открытую адресацию. Должна быть поддержка расширения внутреннего буфера.

interface LLNode {
    key: number;
    value: number;
    next: LLNode | null;
}
class HashMap {
    #size: number;
    #buffer: Array<LLNode | null>;
    length: number = 0;
    constructor(size: number) {
        this.#size = size;
        this.#buffer = new Array(this.#size);
    }

    set<K, V extends number>(key: K, value: V) {
        if (this.#size * 0.75 <= this.length + 1) {
            this.#increaseBuffer();
        }
        const hash = this.#getHash(JSON.stringify(key));
        const index = this.#getIndex(hash);

        const currentLLNode = { key: hash, value, next: null };
        let temp: LLNode | null = this.#buffer[index];

        if (temp) {
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = currentLLNode;
        } else {
            this.#buffer[index] = currentLLNode;
        }

        this.length++;
    }
    get<K>(key: K) {
        const hash = this.#getHash(JSON.stringify(key));
        let index = this.#getIndex(hash);
        let temp: LLNode | null = this.#buffer[index];

        while (temp) {
            if (temp.key === hash) {
                return temp.value;
            }
            temp = temp.next;
        }
        throw new Error('this key does not exist');
    }

    has<K>(key: K) {
        const hash = this.#getHash(JSON.stringify(key));
        let index = this.#getIndex(hash);
        let temp: LLNode | null = this.#buffer[index];

        while (temp) {
            if (temp.key === hash) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    delete<K>(key: K) {
        const hash = this.#getHash(JSON.stringify(key));
        let index = this.#getIndex(hash);
        let temp: LLNode | null = this.#buffer[index];
        if (temp) {
            if (temp.key === hash) {
                this.#buffer[index] = temp.next;
            }
            while (temp) {
                if (temp.next && temp.next.key === hash) {
                    const currentValue = temp.next.value;
                    temp.next = temp.next.next;
                    return currentValue;
                }
                temp = temp.next;
            }
        }
    }

    #getHash(key: string) {
        var hash = 0,
            i,
            chr;
        if (key.length === 0) return hash;
        for (i = 0; i < key.length; i++) {
            chr = key.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    #getIndex(hash: number) {
        let index = hash < 0 ? ~hash + 1 : hash;
        while (index >= this.#size) {
            index = Math.floor((index / 1000) * (this.#size + 1));
        }

        return index;
    }

    #increaseBuffer() {
        const currentBuffer = this.#buffer;
        this.#size = this.#size * 2;
        this.#buffer = new Array(this.#size);

        for (let i = 0; i < currentBuffer.length; i++) {
            let temp: LLNode | null = currentBuffer[i];
            while (temp) {
                const index = this.#getIndex(temp.key);

                const currentLLNode = {
                    key: temp.key,
                    value: temp.value,
                    next: null,
                };

                let tempInside: LLNode | null = this.#buffer[index];
                if (tempInside) {
                    while (tempInside.next) {
                        tempInside = tempInside.next;
                    }
                    tempInside.next = currentLLNode;
                } else {
                    this.#buffer[index] = currentLLNode;
                }

                temp = temp.next;
            }
        }
    }

    co() {
        return this.#buffer;
    }
}

// Задаем ёмкость внутреннего буфера
const map = new HashMap(4);

let document = {
    location: {
        ancestorOrigins: {},
        href: 'https://github.com/',
        origin: 'https://github.com',
        protocol: 'https:',
        host: 'github.com',
        hostname: 'github.com',
        port: '',
        pathname: '/',
        search: '',
        hash: '',
    },
    _reactListeningegdodlale5b: true,
};
map.set('foo', 1);
map.set(42, 10);
map.set(document, 100);

console.log(map.get(42)); // 10
console.log(map.has(document)); // true
console.log(map.delete(document)); // 100
console.log(map.has(document)); // false
