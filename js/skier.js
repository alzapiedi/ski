var MovingObject = require('./movingObject'),
    Utils = require('./utils'),
    Obstacle = require('./obstacle'),
    Ramp = require('./ramp'),
    Yeti = require('./yeti');

var Skier = function (attr) {
  var pos = attr.pos;
  var game = attr.game;
  var img = attr.img;
  this.frameIndex = 0;
  this.animationDir = -1;
  this.lastCollision = {id: 0};
  MovingObject.call(this, {pos: pos, vel: [0, 0], game: game, img: img});
}
Utils.inherits(Skier, MovingObject);


Skier.prototype.getHitBox = function () {
  var pos = this.pos;
  return {top: pos[1] + 15, bottom: pos[1] + 30, left: pos[0] + 5, right: pos[0] + 15};
}

Skier.prototype.isCollidedWith = function (otherObject) {
  if (this.game.god) { return false; }
  return Utils.overlap(this.getHitBox(), otherObject.getHitBox());
};


Skier.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Obstacle && this.game.canCrash  && !this.game.isJumping && !(otherObject.id === this.lastCollision.id)) {
    this.lastCollision = otherObject;
    this.game.skiCrash();
  } else if (otherObject instanceof Ramp && !this.game.isJumping) {
    this.game.skiJump();
  } else if (otherObject instanceof Yeti && !this.game.isJumping) {
    this.game.killSkier();
  }
}

Skier.prototype.draw = function (ctx, timeDelta) {
  if (!this.game.over) {
    if (this.game.isJumping) {
      this.pos[1] += (timeDelta/(1000/60))*this.animationDir*1.6;
      if (this.pos[1] < 200) {
        this.animationDir = 1;
      }
    }
    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
  } else {
    this.startTime = this.startTime || Date.now();
    var time = Date.now() - this.startTime;
    if (time > 100) {
      this.frameIndex += 1;
      this.startTime = Date.now();
      if (this.frameIndex > 4) { this.frameIndex = 4; }
    }
    ctx.drawImage(this.img, this.frameIndex * 35, 0, 35, 43, this.pos[0], this.pos[1], 35, 43);
  }
}


module.exports = Skier;
