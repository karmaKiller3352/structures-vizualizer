import Queue from "features/BinaryTree/tree/Queue";

export function traverse(node, callback) {
  if (typeof callback === "function") {
    callback(node);
  }

  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left, callback);
  tree.right = node.right === null ? null : traverse(node.right, callback);
  return tree;
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
