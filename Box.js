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
    this._context.rect(this.x, this.y, this.size, this.size);
    this._context.stroke();
  }

  getBoundariesPoints() {
    return [
      {
        initialX: this.x,
        initialY: this.y,
        finalX: this.x + this.size,
        finalY: this.y,
      },
      {
        initialX: this.x,
        initialY: this.y,
        finalX: this.x,
        finalY: this.y + this.size,
      },
      {
        initialX: this.x + this.size,
        initialY: this.y,
        finalX: this.x + this.size,
        finalY: this.y + this.size,
      },
      {
        initialX: this.x,
        initialY: this.y + this.size,
        finalX: this.x + this.size,
        finalY: this.y + this.size,
      }
    ]
  }
}