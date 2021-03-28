  
var character = document.getElementById("character");
var block = document.getElementById("block");

function startJump() {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeout(function() {character.classList.remove("jumper");},1000);
}

function moveLeft() {
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      // up arrow
      startJump();
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
      // left arrow
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.left = posLeft - 3;
    }
    else if (e.keyCode == '39') {
       // right arrow
      var pos = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.left = posLeft + 3;
    }

}
