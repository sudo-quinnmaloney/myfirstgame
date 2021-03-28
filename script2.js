  
var character = document.getElementById("character");
var block = document.getElementById("block");
var mvmtSpeed = 6;


function startJump() {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeout(function() {character.classList.remove("jumper");},1000);
}

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    if (map[16]) {
      mvmtSpeed = 12;
    } else { mvmtSpeed = 6; }
  
    if (map[38] || map[32] || map[65]) {
      // up arrow
      startJump();
    }
    if (map[40]) {
        // down arrow
    }
    if (map[37] || map[87]) {
      // left arrow
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.style.left = posLeft - mvmtSpeed + 'px';
    }
    if (map[39] || map[68]) {
       // right arrow
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.style.left = posLeft + mvmtSpeed + 'px';
    }

}
