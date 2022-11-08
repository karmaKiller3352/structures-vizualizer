import { action, makeAutoObservable, observable } from "mobx";

class Canvas {
  ctx = null;
  canvas = null;
  initialized = false;
  xCellAmount = 21;
  yCellAmount = 40;
  cellSize = 0;
  maxWidth = 0;
  maxHeight = 0;

  constructor() {
    makeAutoObservable(this, {
      canvas: observable,
      xCellAmount: observable,
      yCellAmount: observable,
      drawMatrix: action,
    });

    this.drawMatrix = this.drawMatrix.bind(this);
  }

  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = 1;
    this.initialized = true;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setWidth(width) {
    if (!this.canvas) return;
    this.canvas.width = width;
  }

  setHeight(height) {
    if (!this.canvas) return;
    this.canvas.height = height;
  }

  calculateYCellAmount() {
    this.yCellAmount = Math.floor(this.maxHeight / this.cellSize);
  }

  calculateCellSize() {
    this.cellSize =
      Math.floor(this.maxWidth / this.xCellAmount) > 5
        ? Math.floor(this.maxWidth / this.xCellAmount)
        : 5;
  }

  updateCellSizes(newXCellAmount) {
    this.xCellAmount = newXCellAmount;

    this.calculateCellSize();
    this.calculateYCellAmount();

    this.drawMatrix(false);
  }

  drowCell(x, y) {
    this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
  }

  drawMatrix(init, maxWidth, maxHeight) {
    if (!this.canvas) return;
    if (init) {
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
    }

    this.calculateCellSize();
    this.calculateYCellAmount();

    this.setWidth(this.xCellAmount * this.cellSize);
    this.setHeight(this.yCellAmount * this.cellSize);

    // if (this.cellSize > 0) {
    //   for (let x = 0; x < this.xCellAmount; x++) {
    //     for (let y = 0; y < this.yCellAmount; y++) {
    //       this.drowCell(x * this.cellSize, y * this.cellSize);
    //     }
    //   }
    // }
  }
}

export default new Canvas();
