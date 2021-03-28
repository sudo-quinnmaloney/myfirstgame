  
var character = document.getElementById("character");
var block = document.getElementById("block");
var game = document.getElementById("game");
var gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width");
var charWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width");
var mvmtSpeed = [6,0];


function startJump() {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeout(function() {character.classList.remove("jumper");},1000);
}

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    var posTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  
    if (map[16]) {
      mvmtSpeed[0] = 12;
    } else { mvmtSpeed[1] = 6; }
    
    if (map[38] || map[32] || map[65]) {
      // up arrow
      if (mvmtSpeed < 8) {
        mvmtSpeed[1] += 1;
      }
      if (posTop > mvmtSpeed){
        character.style.top = posTop - mvmtSpeed[2] + 'px';
      }
    } else if (posTop < 140) {
      //fall
      mvmtSpeed[1] -= 2;
      character.style.top = posTop - mvmtSpeed[2] + 'px';
    } else { mvmtSpeed[1] = 0; }
  
    if ((map[37] || map[87]) && posLeft > 0) {
      // left arrow
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.style.left = posLeft - mvmtSpeed[0] + 'px';
    }
    if (map[39] || map[68] && posLeft < gameWidth - charWidth) {
       // right arrow
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.style.left = posLeft + mvmtSpeed[0] + 'px';
    }
}
