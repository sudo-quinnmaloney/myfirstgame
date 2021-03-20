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
    alert("Contact");
  }
},10);
