import Node from "./Node";

function traverse(node, callback) {
  if (typeof callback === "function") {
    callback(node);
  }

  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left, callback);
  tree.right = node.right === null ? null : traverse(node.right, callback);
  return tree;
}

export default class BinaryTree {
  constructor() {
    this.root = null;
    this.length = 0;

    this.width = 0;
    this.height = 0;
  }

  _insertNodeToTree(tree, node) {
    if (node.value < tree.value) {
      if (!tree.left) {
        node.parent = tree;
        node.level = tree.level + 1;
        tree.left = node;

        return node;
      }

      return this._insertNodeToTree(tree.left, node);
    } else {
      if (!tree.right) {
        node.parent = tree;
        node.level = tree.level + 1;
        tree.right = node;

        return node;
      }

      return this._insertNodeToTree(tree.right, node);
    }
  }

  find(value) {
    if (!this.root) {
      return false;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        return currentNode;
      }
    }

    return null;
  }

  iterate(callback) {
    if (this.root) {
      traverse(this.root, callback);
    }
  }

  insert(value) {
    const hasValue = this.find(value);

    if (hasValue || !Number.isInteger(value)) return false;

    const newNode = new Node(value);
    this.length += 1;

    if (!this.root) {
      newNode.level = 1;
      newNode.parent = null;
      this.root = newNode;
      this.height = 1;
      return newNode;
    } else {
      const node = this._insertNodeToTree(this.root, newNode);

      if (node.level > this.height) {
        this.height = node.level;
      }

      return node;
    }
  }

  reset() {
    this.root = null;
    this.length = 0;

    this.width = 0;
    this.height = 0;
  }
}
