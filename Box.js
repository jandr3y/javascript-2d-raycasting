class Box {
  constructor(x, y, size, context){
    this.x = x;
    this.y = y;
    this.size = size;
    this._context = context;
  }

  draw() {
    this._context.fillStyle = 'black';
    this._context.beginPath();
    this._context.moveTo(this.x, this.y);
    this._context.lineTo(this.x + this.size, this.y + this.size);
    this._context.stroke();
    // this._context.fillRect(this.x, this.y, this.size, this.size);
  }

  getBoundariesPoints() {
    return {
      initialX: this.x,
      initialY: this.y,
      finalX: this.x + this.size,
      finalY: this.y + this.size
    }
  }
}