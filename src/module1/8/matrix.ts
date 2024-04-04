// ## Реализовать итератор values для матрицы

import assert from "node:assert";
import test from "node:test";

class Matrix<T extends TypedArrayType> {
  #row
  #col
  #depth
  #dimensions
  #matrix: TypedArray
  constructor(type: T, x:number,y:number,z:number) {
    this.#row = x;
    this.#col = y;
    this.#depth = z;
    this.#dimensions = x*y*z;
    this.#matrix = new type (this.#dimensions);
  }

  set(x: number, y: number, z: number, value: number) {
    this.#matrix[this.#getIndex(x, y, z)] = value;
  }
  values() {
    return this.#matrix
  }
  #getIndex(x: number, y: number, z: number) {
   return x * this.#depth * this.#col + (z * this.#row + y);
  }
}

test('test matrix class', () => {
  const matrix2n2n2 = new Matrix(Int32Array, 2, 2, 2);

  matrix2n2n2.set(0, 0, 0, 1);
  matrix2n2n2.set(0, 1, 0, 2);
  matrix2n2n2.set(0, 0, 1, 3);
  matrix2n2n2.set(0, 1, 1, 4);
  
  matrix2n2n2.set(1, 0, 0, 5);
  matrix2n2n2.set(1, 1, 0, 6);
  matrix2n2n2.set(1, 0, 1, 7);
  matrix2n2n2.set(1, 1, 1, 8);

  const result = [1, 2, 3, 4, 5, 6, 7, 8]
  assert.deepEqual(Array.from(matrix2n2n2.values()), result)
});
