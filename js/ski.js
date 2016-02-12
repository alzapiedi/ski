var MovingObject = require('./movingObject'),
    Utils = require('./utils'),
    Skier = require('./skier'),
    Obstacle = require('./obstacle'),
    Ramp = require('./ramp');

var Ski = function () {
  this.loadImages();
  this.obstacles = [];
  this.ramps = [];
  this.crashed = false;
  this.canCrash = true;
  this.direction = 3;
  this.speed = 1;
  this.density = 1;
  this.isJumping = false;
  // skiImg.onload = function () {
  this.skier = new Skier({pos: [400, 300], game: this, img: this.skierImgs[3]});
  // }.bind(this);
  this.startObjectInterval();
}

Ski.prototype.setSpeed = function (s) {
  clearInterval(this.objInterval);
  this.objInterval = 0;
  this.speed = s;
  this.updateVelocities();
  this.startObjectInterval();
}

Ski.prototype.setDensity = function (d) {
  clearInterval(this.objInterval);
  this.objInterval = 0;
  this.density = d;
  this.startObjectInterval()
}

Ski.prototype.vels = function () {
  var s = this.speed;
  var vels = {
    3: [0,0],
    4: [-8 * s, -6 * s],
    5: [-4 * s, -10 * s],
    6: [0, -13 * s],
    7: [4 * s, -10 * s],
    8: [8 * s, -6 * s],
    9: [0,0],
    10: [0,0]
  };
  return vels;
}

Ski.prototype.remove = function (object) {
    if(object instanceof Obstacle){
      var i = this.obstacles.indexOf(object);
      this.obstacles.splice(i, 1);
    } else if (false) {

    }
  };

Ski.prototype.loadImages = function () {
  var ski3 = new Image();
  var ski4 = new Image();
  var ski5 = new Image();
  var ski6 = new Image();
  var ski7 = new Image();
  var ski8 = new Image();
  var ski9 = new Image();
  var ski10 = new Image();
  var skiCrash = new Image();
  var skiJump = new Image();
  var tree1 = new Image();
  var tree2 = new Image();
  var tree3 = new Image();
  var rock = new Image();
  var ramp = new Image();
  ski3.src = 'img/skier3.png';
  ski4.src = 'img/skier4.png';
  ski5.src = 'img/skier5.png';
  ski6.src = 'img/skier6.png';
  ski7.src = 'img/skier7.png';
  ski8.src = 'img/skier8.png';
  ski9.src = 'img/skier9.png';
  ski10.src = 'img/skier10.png';
  skiCrash.src = 'img/skicrash.png';
  skiJump.src = 'img/skijump.png';
  tree1.src = 'img/tree1.png';
  tree2.src = 'img/tree2.png';
  tree3.src = 'img/tree3.png';
  rock.src = 'img/rock.png';
  ramp.src = 'img/ramp.png';
  this.skierImgs = {3: ski3, 4: ski4, 5: ski5, 6: ski6, 7: ski7, 8: ski8, 9: ski9, 10: ski10, crash: skiCrash, jump: skiJump};
  this.obstacleImgs = {0: tree1, 1: tree2, 2: tree3, 3: rock};
  this.rampImg = ramp;
}

Ski.prototype.allObjects = function () {
  var obj = this.obstacles.concat(this.ramps);
  return obj;
}

Ski.prototype.startObjectInterval = function () {
  this.objInterval = setInterval(function () {
    if ( this.direction > 3 && this.direction < 9 ) {
      this.addObject();
    }
  }.bind(this), (300/this.speed)/this.density);
}

Ski.prototype.randomPosition = function () {
  var x = Math.floor(Math.random() * 800);
  return [x, 600];
}

Ski.prototype.draw = function (ctx) {
  ctx.clearRect(0,0,800,600);
  if (!this.isJumping) { this.skier.draw(ctx); }
  this.allObjects().forEach(function (obj) {
    obj.draw(ctx);
  });
  if (this.isJumping) { this.skier.draw(ctx); }
}

Ski.prototype.moveObjects = function () {
  this.allObjects().forEach(function (obj) {
    obj.move();
  });
}

Ski.prototype.shiftObjects = function (n) {
  this.allObjects().forEach(function (obj) {
    obj.shift(n);
  });
}

Ski.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Ski.prototype.checkCollisions = function () {
  var obj = this.allObjects();
  for (var i = 0; i < obj.length; i++) {
    if (this.skier.isCollidedWith(obj[i])) {
      this.skier.collideWith(obj[i]);
    }
  }
}

Ski.prototype.addObject = function () {
  var i = Math.floor(Math.random() * 10);
  if (i > 2) {
    var j = Math.floor(Math.random() * 4);
    var obstacle = new Obstacle({
      pos: this.randomPosition(),
      vel: this.vels()[this.direction],
      game: this,
      img: this.obstacleImgs[j],
      style: j
    });
    this.obstacles.push(obstacle);
  } else {
    var ramp = new Ramp({
      pos: this.randomPosition(),
      vel: this.vels()[this.direction],
      game: this,
      img: this.rampImg
    });
    this.ramps.push(ramp);
  }
}

Ski.prototype.updateVelocities = function () {
  this.allObjects().forEach(function (obj) {
    obj.vel = this.vels()[this.direction];
  }.bind(this));
}

Ski.prototype.changeDirection = function (keyCode) {  //37 left   39 right
  if (!this.crashed && !this.isJumping) {
    var dir = this.direction;
    if (dir === 10) {
      setTimeout(function () {
        this.canCrash = true;
      }.bind(this), 1000)
    }


    if (keyCode === 37 && dir === 3) {
      this.direction = 9;
    } else if (keyCode === 37 && dir > 3 && dir < 9) {
      this.direction += 1;
    } else if (keyCode === 39 && dir === 9) {
      this.direction = 3;
    } else if (keyCode === 39 && dir > 3 && dir < 9) {
      this.direction -= 1;
    } else if (keyCode === 40) {
      this.direction = 6;
    } else if (keyCode === 37 && dir === 9) {
      this.shiftObjects(10);
    } else if (keyCode === 39 && dir === 3) {
      this.shiftObjects(-10);
    } else {
      return;
    }
    this.skier.img = this.skierImgs[this.direction];
    this.updateVelocities();
  }
}

Ski.prototype.skiCrash = function () {
  clearInterval(this.objInterval);
  this.objInterval = 0;
  this.skier.img = this.skierImgs["crash"];
  this.crashed = true;
  this.canCrash = false;
  this.allObjects().forEach(function (obj) {
    obj.vel = [0, 0];
  });
  setTimeout(function () {
    this.crashed = false;
    this.direction = 10;
    this.skier.img = this.skierImgs[this.direction];
    this.updateVelocities();
    this.startObjectInterval();
  }.bind(this), 1000);
}

Ski.prototype.skiJump = function () {
  this.isJumping = true;
  this.direction = 6;
  this.updateVelocities();
  this.canCrash = false;
  this.skier.img = this.skierImgs["jump"];
  setTimeout(function () {
    this.isJumping = false;
    this.canCrash = true;
    this.direction = 6;
    this.skier.img = this.skierImgs[this.direction];
    this.skier.animationDir = -1;
    this.skier.pos = [400, 300];
  }.bind(this), 2000);
}


module.exports = Ski;
