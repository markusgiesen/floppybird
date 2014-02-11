var gravity = 0.25;
var velocity = -5.5;
var position = 180;
var rotation = 0;
var pipes = new Array();

$(document).ready(function() {
   var updaterate = 1000.0 / 60.0 ; //60 times a second
   setInterval(mainloop, updaterate);
   setInterval(updatePipes, 1200);
});

function mainloop() {
   var player = $("#player");
   
   //update the player speed/position
   velocity += gravity;
   position += velocity;
   
   //rotation
   rotation = Math.min((velocity / 10) * 90, 90);
   
   player.css({ rotate: rotation, top: position });
   
   //finally check for collision
   var box = document.getElementById('player').getBoundingClientRect();
   var origwidth = 34.0;
   var origheight = 24.0;
   //average out the size a little
   var newwidth = (origwidth + box.width) / 2;
   var newheight = (origheight + box.height) / 2;
   var newleft = ((box.width - newwidth) / 2) + box.left;
   var newtop = ((box.height - newheight) / 2) + box.top;
   var degwidth = origwidth - (Math.sin(Math.abs(rotation) / 90) * 4);
   $("#borderbox").css('left', newleft);
   $("#borderbox").css('top', newtop);
   $("#borderbox").css('height', newheight);
   $("#borderbox").css('width', degwidth);
   $("#position").text(player.position().top + " - " + player.height());
   $("#info").text(rotation);
   
   //bounce (for testing)
   if(box.bottom >= $("#land").offset().top)
      velocity = -velocity;
}

//Handle space bar
$(document).keydown(function(e){
   //space bar!
   if(e.keyCode == 32)
       playerJump();
});

//Handle mouse down OR touch start
if("ontouchstart" in window)
   $(document).on("touchstart", playerJump);
else
   $(document).on("mousedown", playerJump);

function playerJump()
{
   velocity = -5.5;
}

function updatePipes()
{
   //Does the first pipe need removal?
   if(pipes[0] != null && pipes[0].position().left <= -100)
   {
      //Yes! remove the dom element and remove it from the array, too
      pipes[0].remove();
      pipes.splice(0, 1);
   }
   //add a new pipe
   var newpipe = $('<div class="pipe"><div class="pipe_upper" style="height: 170px;"></div><div class="pipe_lower" style="height: 130px;"></div></div>');
   $("#flyarea").append(newpipe);
   pipes.push(newpipe);
}