import Node from "./Node";

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

        tree.left = node;

        return node;
      }

      return this._insertNodeToTree(tree.left, node);
    } else {
      if (!tree.right) {
        node.parent = tree;

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

  insert(value) {
    const hasValue = this.find(value);

    if (hasValue || !Number.isInteger(value)) return false;

    const newNode = new Node(value);
    this.length += 1;

    if (!this.root) {
      newNode.parent = null;
      this.root = newNode;
      return newNode;
    } else {
      const node = this._insertNodeToTree(this.root, newNode);

      return node;
    }
  }

  findLastLeft(node) {
    if (node.left === null) {
      return node;
    } else return this.findLastLeft(node.left);
  }

  remove(value) {
    if (!this.root) {
      return false;
    }

    const node = this.find(value);

    if (!node) {
      return false;
    }

    const parent = node?.parent;

    if (node.left === null && node.right === null) {
      if (value > parent.value) {
        parent.right = null;
      } else {
        parent.left = null;
      }
    } else if (node.right === null) {
      if (value > parent.value) {
        parent.right = node.left;
      } else {
        parent.left = node.left;
      }
      node.left.parent = parent;
    } else if (node.left === null) {
      if (value > parent.value) {
        parent.right = node.right;
      } else {
        parent.left = node.right;
      }
      node.right.parent = parent;
    } else {
      const lastLeftNode = this.findLastLeft(node.right);
      node.value = lastLeftNode.value;

      if (lastLeftNode.value < lastLeftNode.parent.value) {
        lastLeftNode.parent.left = lastLeftNode.right;
      } else {
        lastLeftNode.parent.right = lastLeftNode.right;
      }
      if (lastLeftNode.right !== null) {
        lastLeftNode.right.parent = lastLeftNode.parent;
      }
    }

    this.length--;

    return true;
  }

  reset() {
    this.root = null;
    this.length = 0;

    this.width = 0;
    this.height = 0;
  }
}
