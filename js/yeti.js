var MovingObject = require('./movingObject'),
    Utils = require('./utils');
var Yeti = function (attrs) {
  this.startTime = Date.now();
  this.frameIndex = 0;
  MovingObject.call(this, attrs);
}
Utils.inherits(Yeti, MovingObject);

Yeti.prototype.move = function (timeDelta) { // 16ms
  var skierPos = this.game.skier.pos;
  var skierDir = this.game.direction;
  this.vel = Utils.vector(this.pos, skierPos);
  if (!this.game.isJumping) {
    if (skierDir === 6) {
      this.vel = Utils.arrayAdd(this.vel, [0, -1.3]);
    } else if (skierDir > 3 && skierDir < 9 && skierDir !== 6) {
      var xOffset = (skierDir - 6)/2;
      var yOffset = 0 - ((skierDir % 3)/4);
      if (this.pos[0] > skierPos[0] && skierDir < 6 ||
          this.pos[0] < skierPos[0] && skierDir > 6) {
            xOffset -= (6-skierDir);
            yOffset *= 1.5;
      }
      this.vel = Utils.arrayAdd(this.vel, [xOffset, yOffset]);
    } else {
      this.vel = [this.vel[0]*3, this.vel[1]*3];
    }
  } else {
    this.vel = [this.vel[0], -1.3];
  }
  if (this.pos[1] < 80) {
    this.vel = [0, -2.5];
  }
  this.pos[0] += this.vel[0] * timeDelta / (1000/60);
  this.pos[1] += this.vel[1] * timeDelta / (1000/60);
  if (this.pos[1] < -50) {
    this.game.remove(this);
  }
}

Yeti.prototype.draw = function (ctx) {
  var skierXpos = this.game.skier.pos[0];
  var right = skierXpos > this.pos[0] ? 0 : 64;
  var time = Date.now() - this.startTime;
  if (time > (300/this.game.speed)) {
    this.startTime = Date.now();
    this.frameIndex += 1;
    if (this.frameIndex > 1) { this.frameIndex = 0; }
  }
  ctx.drawImage(this.img, (this.frameIndex * 32) + right, 0, 32, 42, this.pos[0], this.pos[1], 32, 42);
}

Yeti.prototype.getHitBox = function () {
  var pos = this.pos;
  return {top: pos[1] + 10, left: pos[0] + 10, right: pos[0] + 20, bottom: pos[1] + 35};
}
module.exports = Yeti;
