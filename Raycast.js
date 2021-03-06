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
      return angleIncrease += (this.object.fov / points);
    });

    return angles.map( angle => this.ray(angle));
  }

  ray(angle) {
    const [x, y] = this.object.getCenter();
    let [ finalX, finalY ] = this.lineToAngle(x, y, 1000, angle);
    let [ intersectionX, intersectionY ] = this.cast(x, y, finalX, finalY);
    return {
      initialX: x,
      initialY: y,
      finalX: intersectionX,
      finalY: intersectionY,
      angle: angle
    }
  }

  draw() {
    // ctx.createRadialGradient(this.x, cHeight - this.y, this.radius, this.x, cHeight - this.y, this.viewRange);
    var gradient = this._context.createRadialGradient(this.object.x, this.object.y, 360, this.object.x, this.object.y, 20);
    gradient.addColorStop(0, "black")
    gradient.addColorStop(1, "white");

    this.rays.map( ray => {
      this._context.beginPath();
      this._context.strokeStyle = gradient;
      this._context.lineCap = "round";
      this._context.lineWidth = 3;
      this._context.moveTo(ray.initialX, ray.initialY);
      this._context.lineTo(ray.finalX, ray.finalY);
      this._context.stroke();
      this._context.closePath();
    });
  }

  cast(initialX, initialY, finalX, finalY) {
    let intersectionX = null;
    let intersectionY = null;
    let proximity = Infinity;

    this.boxes.map( box => {
      const boxLimitsArray = box.getBoundariesPoints();
      
      boxLimitsArray.map( boxLimits => {
        const i = (boxLimits.initialX - boxLimits.finalX) * (initialY - finalY) - (boxLimits.initialY - boxLimits.finalY) * (initialX - finalX)
        
        if ( i == 0 ) {
          return [ finalX, finalY ];
        }
  
        const t = ((boxLimits.initialX - initialX) * (initialY - finalY) - (boxLimits.initialY - initialY) * (initialX - finalX)) / i;
        const u = -((boxLimits.initialX - boxLimits.finalX) * (boxLimits.initialY - initialY) - (boxLimits.initialY - boxLimits.finalY) * (boxLimits.initialX - initialX)) / i;
  
        if ( t > 0 && t < 1 && u > 0 ) {
          const currentIntersectionX = boxLimits.initialX + t * (boxLimits.finalX - boxLimits.initialX);
          const currentIntersectionY = boxLimits.initialY + t * (boxLimits.finalY - boxLimits.initialY);
  
          const x = (boxLimits.initialX + boxLimits.finalX) / 2;
          const y = (boxLimits.initialY + boxLimits.finalY) / 2;

          const a = initialX - currentIntersectionX;
          const b = initialY - currentIntersectionY;
  
          const currentProximity = Math.sqrt( a * a +  b * b );
          
          if ( currentProximity <= proximity ) {
            intersectionX = currentIntersectionX;
            intersectionY = currentIntersectionY;
            proximity = currentProximity;
          }
        }
      })
    });

    if ( intersectionX && intersectionY ) {
      return [ intersectionX, intersectionY ];
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