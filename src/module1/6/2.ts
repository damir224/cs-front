// ## Реализовать класс для описания 3-х мерной матрицы

interface Coordinates {
    x: number;
    y: number;
    z: number;
}
class Matrix3D {
    #dimensions: Coordinates;
    #matrix: Record<string, number> = {};
    constructor(dimensions: Coordinates) {
        this.#dimensions = dimensions;
    }
    set(coordinates: Coordinates, value: number) {
        const key = this.getKeyFromCoords(coordinates);
        return (this.#matrix[key] = value);
    }
    get(coordinates: Coordinates) {
        const key = this.getKeyFromCoords(coordinates);
        return this.#matrix[key];
    }
    getKeyFromCoords(coordinates: Coordinates): number {
        const { x, y, z } = coordinates;
        const cordKey = coordinates.x + coordinates.y + coordinates.z;
        const { x: maxX, y: maxY, z: maxZ } = this.#dimensions;
        if (maxX < x || maxY < y || maxZ < z) {
            throw 'coordinates out of dimension';
        }
        return cordKey;
    }
}
const matrix = new Matrix3D({ x: 10, y: 10, z: 10 });

matrix.set({ x: 1, y: 3, z: 2 }, 10);
matrix.get({ x: 1, y: 3, z: 2 });
