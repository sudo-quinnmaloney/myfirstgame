  
var character = document.getElementById("character");
var block = document.getElementById("block");
var game = document.getElementById("block");

function jump {
  if (character.classList.contains("jumper")){return;}
  character.classList.add("jumper");
  setTimeOut(jump() {character.classList.remove("jumper");},1000);
}
