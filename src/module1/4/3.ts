// ## Реализовать стек на основе типизированного массива заданной длины

class Stack {
    arr: Int32Array;
    top: number = -1
    head: number = -1
    constructor(arr: Int32Array) {
        this.arr = arr;
    }

    push(num:number) {
      if(this.top === this.arr.length) {
        throw new Error('stack overflow')
      }
      this.head = num
      if(this.top === -1){
        ++this.top
        this.arr[0] = num
        return 
      } 
      this.arr[++this.top] = num
    }
    pop() {
      if(this.top === -1) {
        throw new Error('stack overflow')
      }
      
      const currentValue = this.arr[this.top]
      this.arr[this.top--] = 0
      this.head = this.arr[this.top]

      return currentValue
    }
}

const stack = new Stack(new Int32Array(10));

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception 
