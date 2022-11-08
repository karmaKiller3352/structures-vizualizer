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

export function traverseBF(root, callback) {
  let nodeQueue = new Queue();
  nodeQueue.enqueue(root);

  while (!nodeQueue.isEmpty()) {
    let currentNode = nodeQueue.dequeue();
    callback(currentNode);

    if (currentNode.left) {
      nodeQueue.enqueue(currentNode.left);
    }

    if (currentNode.right) {
      nodeQueue.enqueue(currentNode.right);
    }
  }
}
