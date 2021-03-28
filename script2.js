  
var character = document.getElementById("character");
var block = document.getElementById("block");
var game = document.getElementById("game");
var gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"));
var gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));        
var charWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
var charHeight = parseInt(window.getComputedStyle(character).getPropertyValue("height"));
var mvmtSpeed = [0,0];
var rising = 0;
var boost = 0;
var movingLeft = 0;
var movingRight = 0;

var refreshGame = setInterval(function(){
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      var posTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
      mvmtSpeed[0] = movingLeft * 3 - movingRight * 3;
  
      if (posLeft - mvmtSpeed[0] - mvmtSpeed[0] * boost > 0 && posLeft - mvmtSpeed[0] - mvmtSpeed[0] * boost < gameWidth - charWidth) {
        character.style.left = posLeft - mvmtSpeed[0] - mvmtSpeed[0] * boost + 'px';
      }
        
      if (rising == 1){ 
        if (mvmtSpeed[1] < 3) {
          mvmtSpeed[1] += 1;
        }
        if (posTop > mvmtSpeed[1]) {
          character.style.top = posTop - mvmtSpeed[1] + 'px';
        } else { 
          character.style.top = 0; 
          mvmtSpeed[1] = 0;
        }
       } else { 
        mvmtSpeed[1] -= 1;
        if (posTop - mvmtSpeed[1] > gameHeight-charHeight) {
          character.style.top = gameHeight-charHeight;
          mvmtSpeed[1] = 0;
        } else {
          character.style.top = posTop - mvmtSpeed[1] + 'px';
        }
       }
},10);

window.addEventListener("keydown", 
  function(e){
    var pressed = e.keyCode;
    // up arrow
    if (pressed == 38 || pressed == 87 || pressed == 32) {
      rising = 1;
    }
    // left arrow
    if (pressed == 37 || pressed == 65) {
      movingLeft = 1;
    }
    // right arrow
    if (pressed == 39 || pressed == 68) { 
      movingRight = 1;
    }
    // boost
    if (pressed == 16) { 
      boost = 1;
    }
},false);

window.addEventListener("keyup", 
  function(e){
    var unpressed = e.keyCode;
    if (unpressed == 38 || unpressed == 32 || unpressed == 87) {
      rising = 0;
    }
    if ((unpressed == 37 || unpressed == 65) && mvmtSpeed[0] > 0) {
      movingLeft = 0;
    }
    if ((unpressed == 39 || unpressed == 68) && mvmtSpeed[0] < 0) {
      movingRight = 0;
    }
    if (unpressed == 16) { 
      boost = 0;
    }
  },false);
