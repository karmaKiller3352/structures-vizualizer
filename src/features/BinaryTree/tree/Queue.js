export default class Queue {
  constructor() {
    this.arr = [];
  }
  enqueue(value) {
    this.arr.push(value);
  }
  dequeue() {
    return this.arr.shift();
  }
  isEmpty() {
    return this.arr.length == 0;
  }
}
