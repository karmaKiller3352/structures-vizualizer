import { makeAutoObservable } from "mobx";
import BinaryTree from "features/BinaryTree/tree/Tree";
import { traverse } from "../helpers";

class TreeRenderer {
  tree = null;
  canvas = null;
  fontSize = 25;

  constructor() {
    makeAutoObservable(this);

    this.addNode = this.addNode.bind(this);
    this.setPositions = this.setPositions.bind(this);
    this.drawTree = this.drawTree.bind(this);
    this.drawNode = this.drawNode.bind(this);
    this.initTree = this.initTree.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.buildTree = this.buildTree.bind(this);
  }

  setPositions() {
    if (!this.tree || !this.tree.root) return [];

    const nodes = [];

    traverse(this.tree.root, (node) => {
      const level = node.parent?.level ? node.parent?.level + 1 : 1;

      node.level = level;

      if (level > this.tree.height) {
        this.tree.height = level;
      }
    });

    let xCellAmount = 2 * Math.pow(2, this.tree.height) - 1;

    if (this.canvas.xCellAmount > xCellAmount) {
      xCellAmount = this.canvas.xCellAmount;
    } else {
      this.canvas.updateCellSizes(xCellAmount);
    }

    const rootXPosition = Math.round(xCellAmount / 2);

    traverse(this.tree.root, (node) => {
      if (node.parent === null) {
        node.positionX = rootXPosition;
        node.positionY = 1;
        nodes.push(node);
      } else {
        node.positionY = node.level * 2;

        const prevNode = node.parent;
        const prevParentNode = node.parent.parent;

        if (node.value > prevNode.value) {
          node.positionX = prevParentNode
            ? prevNode.positionX +
              Math.round(
                Math.abs(prevNode.positionX - prevParentNode.positionX) / 2
              )
            : prevNode.positionX +
              Math.round((xCellAmount - prevNode.positionX) / 2);
        } else {
          node.positionX = prevParentNode
            ? prevNode.positionX -
              Math.round(
                Math.abs(prevParentNode.positionX - prevNode.positionX) / 2
              )
            : prevNode.positionX -
              Math.round((xCellAmount - prevNode.positionX) / 2);
        }

        nodes.push(node);
      }
    });

    return nodes;
  }

  addNode(value) {
    const node = this.tree.insert(value);

    this.drawTree();

    return node;
  }

  buildTree(nodeValues) {
    this.clearCanvas();
    const values = nodeValues.split(",").map(Number);

    values.forEach((value) => {
      this.addNode(value);
    });

    this.drawTree();
  }

  removeNode(value) {
    const isNodeDeleted = this.tree.remove(value);

    if (isNodeDeleted) {
      this.canvas.clearCanvas();
      this.drawTree();
    }

    return isNodeDeleted;
  }

  clearCanvas() {
    this.tree.reset();

    this.canvas.clearCanvas();
  }

  initTree({ canvas }) {
    this.tree = new BinaryTree();
    this.canvas = canvas;
  }

  drawConnection({
    parentX,
    parentY,
    centerX,
    centerY,
    isParentLeaf,
    isParentRoot,
  }) {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.lineWidth = 3;
    if (isParentLeaf) {
      this.canvas.ctx.strokeStyle = "green";
    } else if (isParentRoot) {
      this.canvas.ctx.strokeStyle = "black";
    } else {
      this.canvas.ctx.strokeStyle = "brown";
    }
    this.canvas.ctx.moveTo(parentX, parentY);
    this.canvas.ctx.lineTo(centerX, centerY);
    this.canvas.ctx.stroke();
    this.canvas.ctx.closePath();
  }

  drawNode({
    x,
    y,
    value,
    isLeaf,
    isRoot,
    parent,
    isParentLeaf,
    isParentRoot,
  }) {
    if (!this.canvas) return;

    const radius =
      Math.floor(this.canvas.cellSize / 2) > 1
        ? Math.floor(this.canvas.cellSize / 2)
        : 2;
    const positionX = x * this.canvas.cellSize;
    const positionY = y * this.canvas.cellSize;

    const centerX = positionX - radius;
    const centerY = positionY - radius;

    this.canvas.ctx.font = "bold 25px sans-serif";
    this.canvas.ctx.textAlign = "center";

    if (isLeaf) {
      this.canvas.ctx.fillStyle = "green";
    } else if (isRoot) {
      this.canvas.ctx.fillStyle = "black";
    } else {
      this.canvas.ctx.fillStyle = "brown";
    }

    if (parent) {
      const parentX = parent.positionX * this.canvas.cellSize - radius;
      const parentY = parent.positionY * this.canvas.cellSize - radius;

      this.drawConnection({
        parentX,
        parentY,
        centerX,
        centerY,
        isParentLeaf,
        isParentRoot,
      });
    }

    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(centerX, centerY, radius - 2, 0, 2 * Math.PI);
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.canvas.ctx.fillText(value, positionX - radius, positionY + 25);
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();
  }

  drawTree() {
    const nodes = this.setPositions();

    nodes.forEach(({ positionX, positionY, value, left, right, parent }) => {
      const isRoot = parent === null;
      const isLeaf = left === null && right === null && !isRoot;

      const isParentRoot = !isRoot && parent?.parent === null;
      const isParentLeaf =
        !isRoot &&
        parent.left === null &&
        parent.right === null &&
        !isParentRoot;

      this.drawNode({
        x: positionX,
        y: positionY,
        parent,
        value,
        isLeaf,
        isRoot,
        isParentLeaf,
        isParentRoot,
      });
    });
  }
}

export default new TreeRenderer();
