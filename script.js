(function(){
  
  function initialize() {
    const screen = document.getElementById('screen');
    const context = screen.getContext('2d');
    const inputEvents = new InputEvents(screen);

    const player = new Player(200, 200, context);
    const boxes = [ 
      new Box(600, 400, 150, 10, context),
      new Box(750, 400, 10, 150, context),
      new Box(100, 500, 80, 300, context),
      new Box(500, 100, 80, 80, context),
      new Box(30, 30, 80, 80, context)
    ];

    function gameloop() {
      context.clearRect(0, 0, screen.width, screen.height); // Clear canvas

      player.movement(inputEvents.keyboardMapping); 
      boxes.map(box => box.draw());

      const raycast = new Raycast(player, 1080, boxes, context);
      raycast.draw();
      window.requestAnimationFrame(gameloop);
    }

    window.requestAnimationFrame(gameloop);
  }
  
  initialize();
})();