(function(){
  
  
  function initialize() {
    const screen = document.getElementById('screen');
    const context = screen.getContext('2d');

    const player = new Player(200, 200, context);
    const boxes = [ 
      new Box(600, 400, 80, context),
      new Box(100, 500, 80, context),
      new Box(500, 100, 80, context),
      new Box(30, 30, 80, context)
    ];
    
    
    screen.addEventListener('mousemove', e => {
      player.x = e.clientX - player.size
      player.y = e.clientY - player.size
    })

    function gameloop() {
      context.clearRect(0, 0, screen.width, screen.height)
      boxes.map( box => box.draw() );
      const raycast = new Raycast(player, 200, boxes, context);
      raycast.draw();
      player.draw();
      window.requestAnimationFrame(gameloop);
    }

    window.requestAnimationFrame(gameloop);
  }
  
  initialize();
})();