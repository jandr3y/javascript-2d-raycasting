class Raycast {
  constructor(object, points = 4, boxes = [], context) {
    this.object = object;
    this.boxes = boxes;
    this._context = context;
    this.points = points;

    this.rays = this.generateRays(points);
  }

  generateRays(points) {
    let angleIncrease = 0;
    let angles = (new Array(points)).fill(1).map( x => {
      return angleIncrease += (360 / points);
    });

    return angles.map( angle => this.ray(angle));
  }

  ray(angle) {
    const [x, y] = this.object.getCenter();
    let [ finalX, finalY ] = this.lineToAngle(x, y, 1000, angle);
    let [ intersectX, intersectY ] = this.cast(x, y, finalX, finalY);
    return {
      initialX: x,
      initialY: y,
      finalX: intersectX,
      finalY: intersectY,
      angle: angle
    }
  }

  draw() {
    this.rays.map( ray => {
      this._context.beginPath();
      this._context.moveTo(ray.initialX, ray.initialY);
      this._context.lineTo(ray.finalX, ray.finalY);
      this._context.stroke();
    });
  }

  cast(initialX, initialY, finalX, finalY) {
    let intersectX = null;
    let intersectY = null;

    this.boxes.map( box => {
      const boxLimits = box.getBoundariesPoints();
      const i = (boxLimits.initialX - boxLimits.finalX) * (initialY - finalY) - (boxLimits.initialY - boxLimits.finalY) * (initialX - finalX)
      
      if ( i == 0 ) {
        return [ finalX, finalY ];
      }

      const t = ((boxLimits.initialX - initialX) * (initialY - finalY) - (boxLimits.initialY - initialY) * (initialX - finalX)) / i;
      const u = -((boxLimits.initialX - boxLimits.finalX) * (boxLimits.initialY - initialY) - (boxLimits.initialY - boxLimits.finalY) * (boxLimits.initialX - initialX)) / i;

      if ( t > 0 && t < 1 && u > 0 ) {
        intersectX = boxLimits.initialX + t * (boxLimits.finalX - boxLimits.initialX);
        intersectY = boxLimits.initialY + t * (boxLimits.finalY - boxLimits.initialY);
      }
    });

    if ( intersectX && intersectY ) {
      return [ intersectX, intersectY ];
    }

    return [finalX, finalY];
  }

  lineToAngle(x, y, length, angle) {
    angle *= Math.PI / 180;

    return [ 
      x + length * Math.cos(angle),
      y + length * Math.sin(angle)
    ];
  }

}