var character = document.getElementById("character");
var block = document.getElementById("block");

function jump() {
  if (characater.classList != "jumping"){
    character.classList.add("jumping");
  }
  setTimeOut(function() {character.classList.remove("jumping");},1000);
}

var checkCollisions = setInterval(function(){
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  if (Math.abs(blockLeft - characterLeft) <= 20 && characterTop >= 125) {
    if (character.classList == "jumping") {
      character.classList.remove("jumping");
    } else {
      character.classList.remove("falling");
    }
  }
  else if (character.classList != "jumping" && characterTop < 140) {
    character.classList.add("falling");
  }
  if (characterTop == 140 && character.classList == "falling") {
    character.classList.remove("falling");
  }
},10);
