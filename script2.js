  
var character = document.getElementById("character");
var block = document.getElementById("block");
var game = document.getElementById("game");
var gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"));
var gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));        
var charWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
var charHeight = parseInt(window.getComputedStyle(character).getPropertyValue("height"));
var mvmtSpeed = [0,0];
var rising = 0;

function startJump() {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeout(function() {character.classList.remove("jumper");},1000);
}

var refreshGame = setInterval(function(){
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      var posTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  
      if (posLeft - mvmtSpeed[0] > 0 && posLeft - mvmtSpeed[0] < gameWidth - charWidth) {
        character.style.left = posLeft - mvmtSpeed[0] + 'px';
      } else { mvmtSpeed[0] = 0;}
        
      if (rising == 1){ 
        mvmtSpeed[1] += 2;
        if (posTop > mvmtSpeed[1]) {
          character.style.top = posTop - mvmtSpeed[1] + 'px';
        } else { 
          character.style.top = 0; 
          mvmtSpeed[1] = 0;
        }
       } else { 
        mvmtSpeed[1] -= 2;
        if (posTop - mvmtSpeed[1] > gameHeight-charHeight) {
          character.style.top = gameHeight-charHeight;
          mvmtSpeed[1] = 0;
        } else {
          character.style.top = posTop - mvmtSpeed[1] + 'px';
        }
       }
},10);

var map = {}; // You could also use an array

onkeyup = function(e){
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == 'keydown';
  
  if (map[38] || map[32] || map[65]) {
    rising = 0;
  }
  
  if (map[39] || map[68]) {
    if (mvmtSpeed[0] > 0) {
      mvmtSpeed[0] = 0;
    } else { mvmtSpeed[0] += 3; }
  }
  if (map[37] || map[87]) {
    if (mvmtSpeed[0] < 0){
      mvmtSpeed[0] = 0;
    } else { mvmtSpeed[0] -= 3; }
  }
}
  
onkeydown = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    
    if (map[38] || map[32] || map[65]) {
      // up arrow
      rising = 1;
    }
    if (map[37] || map[87]) {
      // left arrow
      mvmtSpeed[0] = 3; }
    }
    if (map[39] || map[68]) {
       // right arrow
        mvmtSpeed[0] = -3; }
    }
    if ((map[39] || map[68]) && (map[37] || map[87])) {
      mvmtSpeed[0] = 0;
    }
    if (map[16]) { mvmtSpeed[0] *= 2; }
}
