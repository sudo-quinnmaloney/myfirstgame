  
var character = document.getElementById("character");
var block = document.getElementById("block");
document.onkeydown = checkKey;


function startJump() {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeout(function() {character.classList.remove("jumper");},1000);
}

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
      character.style.left = posLeft - 3 + 'px';
    }
    else if (e.keyCode == '39') {
       // right arrow
      var pos = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      character.style.left = posLeft + 3 + 'px';
    }

}
