var character = document.getElementById("character");
var charWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
var charHeight = parseInt(window.getComputedStyle(character).getPropertyValue("height"));

var coin = document.getElementById("coin");
var blockWidth = parseInt(window.getComputedStyle(coin).getPropertyValue("width"));
var blockHeight = parseInt(window.getComputedStyle(coin).getPropertyValue("height"));

var game = document.getElementById("game");
var gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"));
var gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));

var scoreDisplay = document.getElementById("collected");
var score = 0;

var carrot = document.getElementById("carrots");
var sprint = document.getElementById("sprint");
var winds = document.getElementById("winds");
var stomp = document.getElementById("stomp");
var wasd = document.getElementById("wasd");

var staminaBar = document.getElementById("stamina");
var stamina = 100;
var staminaIncrement = 2;

var mvmtSpeed = [0,0];
var rising = 0;
var stomping = 0;
var boost = 0;
var movingLeft = 0;
var movingRight = 0;
var revealText = 0;
var stall = 0;

function respawnCoin() {
  var newTop = Math.floor(Math.random() * (gameHeight - blockHeight));
  coin.style.top = newTop - 63 + 'px';
  
  coin.classList.remove("slideAcross");
  void coin.offsetWidth;
  coin.classList.add("slideAcross"); 
}

function checkLevel() {
  switch(score) {
    case(25):
      var coinSpeed = document.getElementsByClassName("slideAcross")[0];
      winds.style.color = "black";
      coinSpeed.style.animationDuration = "3.5s";
      break;
    case(10):
      wasd.style.color = "transparent";
      sprint.style.color = "transparent";
      carrtos.style.color = "transparent";
      break;
    case(35):
      winds.style.color = "transparent";
      break;
    case(50):
      stomp.style.color = "black";
      break;
    case(60):
      stomp.style.color = "transparent";
      break;
    default:
      break;
  }
  return;
}

function collide() {
  score++;
  scoreDisplay.innerHTML = score;
  respawnCoin();
  checkLevel();
}

var checkBounds = setInterval(function(){       
  var newgameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"));
  var newgameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));
  if (newgameWidth != gameWidth || newgameHeight != gameHeight) {
    character.style.left = 10 +'%';
    character.style.top = gameHeight - charHeight - 1 + 'px';
    gameWidth = newgameWidth;
    gameHeight = newgameHeight;
  }
  switch (Math.floor(revealText)) {
    case 1: 
      sprint.style.color = "black";
      revealText += .2;
      break;
    case 2:
      carrot.style.color = "black";
      if (coin.classList.contains("slideAcross")){break;}
      coin.classList.add("slideAcross");
      break;
    default:
      break;
  }
}, 3000);

var refreshGame = setInterval(function(){
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
      var posTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  
      var blockLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left"));
      var blockTop = parseInt(window.getComputedStyle(coin).getPropertyValue("top")) + 63;
  
      if (posLeft < blockWidth + blockLeft && blockLeft < charWidth + posLeft && posTop < blockHeight + blockTop && posTop + charHeight > blockTop) {
        collide();
      }
  
      var base = gameHeight;
      var rightBound = gameWidth;
      var leftBound = 0;
      var effectiveBoost = boost;
  
      mvmtSpeed[0] = movingLeft * 3 - movingRight * 3;
      
      if (stomping || stall) {
        mvmtSpeed[1] = -16;
        if (posTop - mvmtSpeed[1] > base-charHeight) {
          character.style.top = base-charHeight;
          mvmtSpeed[1] = 0;
          stomping = 0;
          if (stall == 50) {
            stall = 0;
          } else { stall++; }
        } else {
          character.style.top = posTop - mvmtSpeed[1] + 'px';
        }
        return;
       } 
  
      if (boost && stamina <= 0) { effectiveBoost = 0; } 
      else if (boost) { stamina -= staminaIncrement; } 
      else if (stamina < 100) { stamina += staminaIncrement/4; }
      staminaBar.style.width = Math.floor(stamina) + '%';

      if (posLeft - mvmtSpeed[0] - mvmtSpeed[0] * effectiveBoost > leftBound && posLeft - mvmtSpeed[0] - mvmtSpeed[0] * effectiveBoost < rightBound - charWidth) {
        character.style.left = posLeft - mvmtSpeed[0] - mvmtSpeed[0] * effectiveBoost + 'px';
      } else { movingLeft = 0; movingRight = 0; }
      
      if (rising == 1){ 
        if (mvmtSpeed[1] < 3 + 2 * effectiveBoost) {
          mvmtSpeed[1] += 1;
        }
        if (posTop > mvmtSpeed[1]) {
          character.style.top = posTop - mvmtSpeed[1] + 'px';
        } else {
          character.style.top = 0; 
          mvmtSpeed[1] = 0;
        }
       } else { 
        if (mvmtSpeed[1] > -6) {
          mvmtSpeed[1] -= 1;
        }
        if (posTop - mvmtSpeed[1] > base-charHeight) {
          character.style.top = base-charHeight;
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
      if (revealText < 1) { revealText += .2; }
      rising = 1;
    }
    // left arrow
    if (pressed == 37 || pressed == 65) {
      if (revealText < 1) { revealText += .2; }
      movingLeft = 1;
    }
    // right arrow
    if (pressed == 39 || pressed == 68) {
      if (revealText < 1) { revealText += .2; }
      movingRight = 1;
    }
    // boost
    if (pressed == 16) {
      if (revealText < 2 && revealText > 1) { revealText += .2; }
      boost = 1;
    }
    // stomp
    if (pressed == 32 && score > 50 && stamina >= 40) {
      stamina -= 40;
      stomping = 1;
      staminaBar.style.width = Math.floor(stamina) + '%';
    }
},false);

window.addEventListener("keyup", 
  function(e){
    var unpressed = e.keyCode;
    if (unpressed == 38 || unpressed == 87) {
      rising = 0;
    }
    if (unpressed == 37 || unpressed == 65) {
      movingLeft = 0;
    }
    if (unpressed == 39 || unpressed == 68) {
      movingRight = 0;
    }
    if (unpressed == 16) { 
      boost = 0;
    }
  },false);
