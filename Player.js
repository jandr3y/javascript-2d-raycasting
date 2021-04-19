class Player {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.speed = 5;
    this.fov = 360;
    this._context = context;
    this.crosshairAngle = 0;
    this.movement = this.movement.bind(this);
  }

  getCenter() {
    return [
      this.x + (this.size / 2),
      this.y + (this.size / 2)
    ];
  }

  crosshairMovement(mouseMapping) {
    // TODO: Corrigir pra aplicar o raycast apenas no campo de visao
    const mouseAngle = Math.atan2(mouseMapping.X - this.x, mouseMapping.Y - this.y);
    this.crosshairAngle = mouseAngle * (180 / Math.PI);
    console.log(this.crosshairAngle)
  }

  movement(keyboardMapping) {
    if ( keyboardMapping.left ) {
      this.x -= this.speed;
    }

    if ( keyboardMapping.right ) {
      this.x += this.speed;
    }

    if ( keyboardMapping.up ) {
      this.y -= this.speed;
    }

    if ( keyboardMapping.down ) {
      this.y += this.speed;
    }
  }

  clear() {
    // TODO
  }
}