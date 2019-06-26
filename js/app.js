// Enemies, player must avoid
var Enemy = function(x, y, move) {
  this.x = x;
  this.y = y;
  this.move = move;

  // image/sprite for enemies, this uses a helper provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game; Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // multiply any movement by the dt parameterwhich will ensure the game runs at the same speed for all computers
  if (this.x < 505) {
    this.x += this.move * dt;
  } else {
    this.x = -101;
  }

  if (
    this.y === player.y &&
    (this.x - 55 < player.x && this.x > player.x - 55)
  ) {
    setTimeout(() => {
      player.x = 101 * 2;
      player.y = 385;
    }, 50);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// write Player class that requires update(), render(), handleInput() methods
const Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
  // ...
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let i = 0;
Player.prototype.handleInput = function(input) {
  if (input == 'left' && this.x > 0) {
    this.x -= 101;
  } else if (input == 'right' && this.x < 404) {
    this.x += 101;
  } else if (input == 'up' && this.y > 0) {
    this.y -= 83;
  } else if (input == 'down' && this.y < 303) {
    this.y += 83;
  }

  if (this.y < 0) {
    // normal function wouldnt work because of .this
    setTimeout(() => {
      this.x = 101 * 2;
      this.y = 385;
    }, 300);

    i++;
    let counter = document.querySelector('#counter');
    counter.innerHTML = `${i}`;
  }
};

// instantiate objects; place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(0, 53, 300);
const enemy2 = new Enemy(0, 136, 200);
const enemy3 = new Enemy(0, 219, 100);
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
// as bottom plate creates pseudo 3d, had to pass Y manually
const player = new Player(101 * 2, 385);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// ********* class based alternative *********

// class Player {
//   constructor() {
//     this.x = x;
//     this.y = y;
//     this.sprite = 'images/char-boy.png';
//   }

//   render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//   };

//   handleInput = function(input) {
//     if (input == 'left' && this.x > 0) {
//   this.x -= 101;
// } else if (input == 'right' && this.x < 404) {
//   this.x += 101;
// } else if (input == 'up' && this.y > 0) {
//   this.y -= 83;
// } else if (input == 'down' && this.y < 332) {
//   this.y += 83;
// }

// if (this.y < 0) {
//   // normal function wouldnt work because of this
//   setTimeout(() => {
//     this.x = 101 * 2;
//     this.y = 385;
//   }, 300);
// }

//   };
// }
