var MovingObject = require('./movingObject'),
    Utils = require('./utils'),
    Skier = require('./skier'),
    Obstacle = require('./obstacle');

var Ski = function () {
  this.loadImages();
  this.obstacles = [];
  this.ramps = [];
  this.crashed = false;
  this.canCrash = true;
  this.direction = 3;
  this.vels = { 3: [0,0], 4: [-10, -9], 5: [-5, -13], 6: [0, -17], 7: [5, -13], 8: [10, -9], 9: [0,0] };
  // skiImg.onload = function () {
  this.skier = new Skier({pos: [400, 300], game: this, img: this.skierImgs[3]});
  // }.bind(this);
  this.startObjectInterval();
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
  var tree1 = new Image();
  var tree2 = new Image();
  var tree3 = new Image();
  var rock = new Image();
  ski3.src = 'img/skier3.png';
  ski4.src = 'img/skier4.png';
  ski5.src = 'img/skier5.png';
  ski6.src = 'img/skier6.png';
  ski7.src = 'img/skier7.png';
  ski8.src = 'img/skier8.png';
  ski9.src = 'img/skier9.png';
  ski10.src = 'img/skier10.png';
  skiCrash.src = 'img/skicrash.png';
  tree1.src = 'img/tree1.png';
  tree2.src = 'img/tree2.png';
  tree3.src = 'img/tree3.png';
  rock.src = 'img/rock.png';
  this.skierImgs = {3: ski3, 4: ski4, 5: ski5, 6: ski6, 7: ski7, 8: ski8, 9: ski9, 10: ski10, crash: skiCrash};
  this.obstacleImgs = {0: tree1, 1: tree2, 2: tree3, 3: rock};
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
  }.bind(this), 250);
}

Ski.prototype.randomPosition = function () {
  var x = Math.floor(Math.random() * 800);
  return [x, 600];
}

Ski.prototype.draw = function (ctx) {
  ctx.clearRect(0,0,800,600);
  this.skier.draw(ctx);
  this.allObjects().forEach(function (obj) {
    obj.draw(ctx);
  });
}

Ski.prototype.moveObjects = function () {
  this.allObjects().forEach(function (obj) {
    obj.move();
  });
}

Ski.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Ski.prototype.checkCollisions = function () {
  if (this.canCrash) {
    var obj = this.allObjects();
    for (var i = 0; i < obj.length; i++) {
      if (this.skier.isCollidedWith(obj[i])) {
        this.skier.collideWith(obj[i]);
      }
    }
  }
}

Ski.prototype.addObject = function () {
  var i = Math.floor(Math.random() * 5);
  if (i > 0) {
    var j = Math.floor(Math.random() * 4);
    var obstacle = new Obstacle({
      pos: this.randomPosition(),
      vel: this.vels[this.direction],
      game: this,
      img: this.obstacleImgs[j],
      style: j
    });
    this.obstacles.push(obstacle);
  } else {

  }
}

Ski.prototype.updateVelocities = function () {
  this.allObjects().forEach(function (obj) {
    obj.vel = this.vels[this.direction];
  }.bind(this));
}

Ski.prototype.changeDirection = function (keyCode) {  //37 left   39 right
  if (!this.crashed) {
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
    } else {
      return;
    }
    this.skier.img = this.skierImgs[this.direction];
    this.updateVelocities();
  }
}

Ski.prototype.skiCrash = function () {
  clearInterval(this.objInterval);
  this.skier.img = this.skierImgs["crash"];
  this.crashed = true;
  this.canCrash = false;
  this.allObjects().forEach (function (obj) {
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


module.exports = Ski;
