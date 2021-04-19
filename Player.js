class Player {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this._context = context;
  }

  draw() {
    this._context.fillStyle = 'green';
    this._context.fillRect(this.x, this.y, this.size, this.size);
  }

  getCenter() {
    return [
      this.x + (this.size / 2),
      this.y + (this.size / 2)
    ];
  }

  clear() {
    // TODO
  }
}