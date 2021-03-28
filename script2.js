  
var character = document.getElementById("character");
var block = document.getElementById("block");

function startJump() {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeout(function() {character.classList.remove("jumper");},1000);
}
