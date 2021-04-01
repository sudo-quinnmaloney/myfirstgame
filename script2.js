var character = document.getElementById("character_avatar");
var charWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
var charHeight = parseInt(window.getComputedStyle(character).getPropertyValue("height"));
var hitbox = document.getElementById("character_hitbox");
var hitboxWidth = parseInt(window.getComputedStyle(hitbox).getPropertyValue("width"));
var hitboxHeight = parseInt(window.getComputedStyle(hitbox).getPropertyValue("height"));
var charSprites = document.getElemnetById("character_spritesheet");

var coin = document.getElementById("coin");
var blockWidth = parseInt(window.getComputedStyle(coin).getPropertyValue("width"));
var blockHeight = parseInt(window.getComputedStyle(coin).getPropertyValue("height"));

var game = document.getElementById("game");
var gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"));
var gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));

var scoreDisplay = document.getElementById("collected");
var score = 0;

var explosion = document.getElementById("explosion");
var explosionSprite = document.getElementById("explosion_sprites");
var explosionHeight = parseInt(window.getComputedStyle(explosion).getPropertyValue("height"));
var explosionTop = parseInt(window.getComputedStyle(explosion).getPropertyValue("top"));
var explosionWidth = parseInt(window.getComputedStyle(explosion).getPropertyValue("width"));
var explosionSpriteHeight = parseInt(window.getComputedStyle(explosionSprite).getPropertyValue("height"));

var carrot = document.getElementById("carrots");
var sprint = document.getElementById("sprint");
var winds = document.getElementById("winds");
var winds2 = document.getElementById("winds2");
var winds3 = document.getElementById("winds3");
var stomp = document.getElementById("stomp");
var boostedStomp = document.getElementById("boostedStomp");
var wasd = document.getElementById("wasd");
var staminaBoost = document.getElementById("staminaBoost");

var staminaBar = document.getElementById("stamina");
var maxStamina = 100;
var stamina = maxStamina;
var staminaIncrement = 2;

var exploding = 0;
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
  coin.style.top = newTop - 103 + 'px';
  
  coin.classList.remove("slideAcross");
  void coin.offsetWidth;
  coin.classList.add("slideAcross"); 
}

function checkLevel() {
  switch(score) {
    case(10):
      wasd.style.color = "transparent";
      sprint.style.color = "transparent";
      carrot.style.color = "transparent";
      break;
    case(20):
      var coinSpeed = document.getElementsByClassName("slideAcross")[0];
      winds.style.color = "black";
      coinSpeed.style.animationDuration = "3.25s";
      break;
    case(30):
      winds.style.color = "transparent";
      break;
    case(50):
      stomp.style.color = "black";
      break;
    case(60):
      stomp.style.color = "transparent";
      break;
    case(75):
      var coinSpeed = document.getElementsByClassName("slideAcross")[0];
      winds2.style.color = "black";
      coinSpeed.style.animationDuration = "2.5s";
      break;
    case(82):
      winds2.style.color = "transparent";
      break;
    case(90):
      boostedStomp.style.color = "black";
      break;
    case(100):
      boostedStomp.style.color = "transparent";
      break;
    case(110):
      winds3.style.color = "black";
      break;
    case(115):
      winds3.style.color = "transparent";
      break;
    case(125):
      maxStamina = 125;
      staminaBoost.style.color = "black";
      break;
    case(135):
      staminaBoost.style.color = "transparent";
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
      revealText += .2;
      if (coin.classList.contains("slideAcross")){break;}
      coin.classList.add("slideAcross");
      break;
    default:
      break;
  }
}, 3000);

var refreshGame = setInterval(function(){
      var posLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left")) + (charWidth - hitboxWidth)/2;
      var posTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")) + (charHeight - hitboxHeight);
  
      var blockLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left"));
      var blockTop = parseInt(window.getComputedStyle(coin).getPropertyValue("top")) + 103;
      
      if (exploding) {
        var expLeft = parseInt(window.getComputedStyle(explosion).getPropertyValue("left"));
        var expTop = parseInt(window.getComputedStyle(explosion).getPropertyValue("top"));
        var expWidth = parseInt(window.getComputedStyle(explosion).getPropertyValue("width"));
      }
  
      if ((posLeft < blockWidth + blockLeft && blockLeft < hitboxWidth + posLeft && posTop < blockHeight + blockTop && posTop + hitboxHeight > blockTop) 
          || (exploding && (expLeft < blockLeft && blockLeft < expLeft + expWidth && expTop < blockTop + blockHeight))){
        collide();
      }
  
      var base = gameHeight;
      var rightBound = gameWidth;
      var leftBound = 0;
      var effectiveBoost = boost;
  
      mvmtSpeed[0] = movingLeft * 3 - movingRight * 3;
      
      if (stomping || exploding) {
        if (stomping) {
          charSprites.style.top = -600;
        } else if (exploding){
          charSprites.style.top = -500;
        }
        mvmtSpeed[1] = -16;
        if (posTop - mvmtSpeed[1] > base-hitboxHeight) {
          character.style.top = base-charHeight + 'px';
          
          mvmtSpeed[1] = 0;
          if (score >= 90 && stomping && boost && !exploding) {
            exploding = 1;
            explosion.style.left = posLeft - 25 + 'px';
            explosion.style.visibility = 'visible';
          }
          stomping = 0;
          if (boost && exploding && stamina > 0) {
            exploding++;
            var growth = exploding * staminaIncrement;
            stamina -= staminaIncrement/4;
            staminaBar.style.width = Math.floor(100 * stamina/maxStamina) + '%';
            explosion.style.height = explosionHeight + growth + 'px';
            explosion.style.width = explosionWidth + growth * 2 + 'px';
            explosionSprite.style.height = explosionSpriteHeight + 4 * growth + 'px';
            explosion.style.top = explosionTop - growth + 'px';
            explosion.style.left = posLeft - 25 - growth + 'px';
          } else if (exploding) {
            explosion.style.visibility = "hidden"; 
            explosion.style.height = explosionHeight + 'px';
            explosion.style.width = explosionWidth + 'px';
            explosionSprite.style.height = explosionSpriteHeight + 'px';
            explosion.style.top = explosionTop + 'px'; 
            exploding = 0;
          }
        } else {
          character.style.top = posTop -(charHeight-hitboxHeight)- mvmtSpeed[1] + 'px';
        }
        return;
       } 
  
      if (boost && stamina <= 0) { effectiveBoost = 0; } 
      else if (boost) { stamina -= staminaIncrement/2; } 
      else if (stamina < maxStamina) { stamina += staminaIncrement/8; }
      staminaBar.style.width = Math.floor(100 * stamina/maxStamina) + '%';

      if (posLeft - mvmtSpeed[0] - mvmtSpeed[0] * effectiveBoost > leftBound && posLeft - mvmtSpeed[0] - mvmtSpeed[0] * effectiveBoost < rightBound - hitboxWidth) {
        if (posTop == base-hitboxHeight){
          if (mvmtSpeed[0] > 0 && effectiveBoost) {
            charSprites.style.top = -100;
          } else if (mvmtSpeed[0] < 0 && effectiveBoost) {
            charSprites.style.top = -200;
          } else {
            charSprites.style.top = 0;
          }
        }
        character.style.left = posLeft - (charWidth-hitboxWidth)/2 - mvmtSpeed[0] - mvmtSpeed[0] * effectiveBoost + 'px';
      } else { movingLeft = 0; movingRight = 0; }
      
      if (rising == 1){ 
        if (mvmtSpeed[1] < 3 + 2 * effectiveBoost) {
          mvmtSpeed[1] += 1;
        }
        if (posTop > mvmtSpeed[1]) {
          character.style.top = posTop - (charHeight-hitboxHeight) - mvmtSpeed[1] + 'px';
          if (effectiveBoost) {
            charSprites.style.top = -400;
          } else {
            charSprites.style.top = -300;
          }
        } else {
          character.style.top = -(charHeight - hitboxHeight); 
          mvmtSpeed[1] = 0;
          charSprites.style.top = -300;
        }
       } else { 
        if (mvmtSpeed[1] > -6) {
          mvmtSpeed[1] -= 1;
        }
        if (posTop - mvmtSpeed[1] > base-hitboxHeight) {
          character.style.top = base-charHeight;
          mvmtSpeed[1] = 0;
          charSprites.style.top = 0;
        } else {
          character.style.top = posTop - (charHeight-hitboxHeight) - mvmtSpeed[1] + 'px';  
          charSprites.style.top = -300;
        }
       }
},10);

window.addEventListener("keydown", 
  function(e){
    var pressed = e.keyCode;
    // up arrow
    if (pressed == 38 || pressed == 87) {
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
    if (score >= 50 && pressed == 32 && stamina >= 10 && !exploding) {
      stamina -= 10;                    
      stomping = 1;
      staminaBar.style.width = Math.floor(100 * stamina/maxStamina) + '%';
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
