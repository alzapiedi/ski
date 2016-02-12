var MovingObject = require('./movingObject'),
    Utils = require('./utils'),
    Skier = require('./skier'),
    Obstacle = require('./obstacle'),
    Ramp = require('./ramp'),
    Yeti = require('./yeti');

var Ski = function () {
  this.loadImages();
  this.obstacles = [];
  this.god = false;
  this.ramps = [];
  this.crashed = false;
  this.canCrash = true;
  this.direction = 3;
  this.speed = 1;
  this.density = 1;
  this.isJumping = false;
  this.timerStart = Date.now();
  this.distance = 0;
  this.over = false;
  this.monster = true;
  // skiImg.onload = function () {
  this.skier = new Skier({pos: [400, 300], game: this, img: this.skierImgs[3]});
  // }.bind(this);
  this.seedObjects();
  this.startObjectInterval();
}

Ski.prototype.setSpeed = function (s) {
  this.stopObjectInterval();
  this.speed = s;
  this.updateVelocities();
  this.startObjectInterval();
}

Ski.prototype.setDensity = function (d) {
  this.stopObjectInterval();
  this.density = d;
  this.startObjectInterval()
}

Ski.prototype.seedObjects = function () {
  for (var i = 0; i < 10; i++) {
    this.addObject();
  }
  this.allObjects().forEach(function (obj) {
    var r = Math.random() * 200 + 100;
    obj.pos[1] -= r;
    obj.pos[0] -= 600;
  });
}

Ski.prototype.vels = function () {
  var s = this.speed;
  var vels = {
    3: [0,0],
    4: [-3 * s, -2 * s],
    5: [-2 * s, -3 * s],
    6: [0, -3.5 * s],
    7: [2 * s, -3 * s],
    8: [3 * s, -2 * s],
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

Ski.prototype.isMoving = function () {
  var moving = this.direction > 3 && this.direction < 9;
  if (!moving) { this.restartTimer(); }
  return moving;
}

Ski.prototype.restartTimer = function () {
  this.timerStart = Date.now();
}

Ski.prototype.getTimer = function () {
  if (this.isMoving()) {
    this.timerNow = Math.floor((Date.now() - this.timerStart)/1000) + "s";
  }
  return this.timerNow;
}

Ski.prototype.killSkier = function () {

}


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
  var banner = new Image();
  var yeti = new Image();
  var eat = new Image();

  yeti.src = 'img/yeti.png';
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
  banner.src = 'img/banner.png';
  eat.src = 'img/eat.png';
  this.skierImgs = {3: ski3, 4: ski4, 5: ski5, 6: ski6, 7: ski7, 8: ski8, 9: ski9, 10: ski10, crash: skiCrash, jump: skiJump, eat: eat};
  this.obstacleImgs = {0: tree1, 1: tree2, 2: tree3, 3: rock};
  this.rampImg = ramp;
  this.banner = banner;
  this.yetiImg = yeti;
}

Ski.prototype.allObjects = function () {
  var obj = this.obstacles.concat(this.ramps);
  if (this.yeti) { obj = obj.concat(this.yeti); }
  return obj;
}

Ski.prototype.startObjectInterval = function () {
  this.objInterval = setInterval(function () {
    if ( this.direction > 3 && this.direction < 9 ) {
      this.addObject();
    }
  }.bind(this), (250/this.speed)/this.density);
}

Ski.prototype.stopObjectInterval = function () {
  clearInterval(this.objInterval);
  this.objInterval = 0;
}

Ski.prototype.randomPosition = function () {
  var x = Math.floor(Math.random() * 1000) - 100;
  x += (6 - this.direction) * 200;
  return [x, 600];
}

Ski.prototype.draw = function (ctx, timeDelta) {
  ctx.clearRect(0,0,800,600);
  ctx.font="20px Helvetica";
  var timer = this.getTimer() || "0s";
  var distance = Math.floor(this.distance) + "ft";
  if (!this.isJumping) { this.skier.draw(ctx, timeDelta); }
  this.allObjects().forEach(function (obj) {
    obj.draw(ctx);
  });
  if (this.isJumping) { this.skier.draw(ctx, timeDelta); }
  ctx.drawImage(this.banner, 0, 0);
  ctx.fillText(timer + " / " + distance,680,55);
}

Ski.prototype.moveObjects = function (timeDelta) {
  this.allObjects().forEach(function (obj) {
    obj.move(timeDelta);
  });
}

Ski.prototype.shiftObjects = function (n) {
  this.allObjects().forEach(function (obj) {
    obj.shift(n);
  });
}

Ski.prototype.enableGodMode = function () {
  this.god = true;
}

Ski.prototype.disableGodMode = function () {
  this.god = false;
}

Ski.prototype.setMonster = function (mon) {
  this.monster = !!mon;
}

Ski.prototype.step = function (timeDelta) {
  if (!this.over) {
    var vel = this.vels()[this.direction];
    this.distance -= vel[1] / 13;
    if (this.distance > 1000 && !this.yeti && this.monster) {   // MAKE 2500
      var r = Math.floor(Math.random() * 1000);
      if (r === 666) {
        this.bringOutTheYeti();
      }
    }
    this.moveObjects(timeDelta);
    this.checkCollisions();
  }
}

Ski.prototype.bringOutTheYeti = function () {
  var vel = this.vels()[this.direction];
  this.yeti = new Yeti({pos: [0, 200], vel: vel, game: this, img: this.yetiImg});
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
  var vel = this.vels()[this.direction];
  this.allObjects().forEach(function (obj) {
    obj.vel = vel;
  }.bind(this));
}

Ski.prototype.changeDirection = function (keyCode) {  //37 left   39 right
  if (!this.crashed && !this.isJumping && !this.over) {
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
  this.stopObjectInterval();
  this.direction = 10;
  this.skier.img = this.skierImgs["crash"];
  this.crashed = true;
  this.canCrash = false;
  this.allObjects().forEach(function (obj) {
    obj.vel = [0, 0];
  });
  setTimeout(function () {
    this.crashed = false;
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

Ski.prototype.killSkier = function () {
  this.over = true;
  this.yeti = null;
  this.skier.img = this.skierImgs["eat"];
  this.direction = 10;
}


module.exports = Ski;
