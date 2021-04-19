class Box {
  constructor(x, y, w, h, context){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this._context = context;
  }

  draw() {
    this._context.fillStyle = 'purple';
    this._context.fillRect(this.x, this.y, this.w, this.h);
  }

  getBoundariesPoints() {
    return [
      {
        initialX: this.x,
        initialY: this.y,
        finalX: this.x + this.w,
        finalY: this.y,
      },
      {
        initialX: this.x,
        initialY: this.y,
        finalX: this.x,
        finalY: this.y + this.h,
      },
      {
        initialX: this.x,
        initialY: this.y + this.h,
        finalX: this.x + this.w,
        finalY: this.y + this.h,
      },
      {
        initialX: this.x + this.w,
        initialY: this.y,
        finalX: this.x + this.w,
        finalY: this.y + this.h,
      }
    ]
  }
}