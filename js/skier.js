var MovingObject = require('./movingObject'),
    Utils = require('./utils'),
    Obstacle = require('./obstacle'),
    Ramp = require('./ramp');

var Skier = function (attr) {
  var pos = attr.pos;
  var game = attr.game;
  var img = attr.img;
  this.animationDir = -1;
  MovingObject.call(this, {pos: pos, vel: [0, 0], game: game, img: img});
}
Utils.inherits(Skier, MovingObject);


Skier.prototype.getHitBox = function () {
  var pos = this.pos;
  return {top: pos[1] + 10, bottom: pos[1] + 30, left: pos[0], right: pos[0] + 15};
}

Skier.prototype.isCollidedWith = function (otherObject) {
  if (!this.game.canCrash) { return false; }
  return Utils.overlap(this.getHitBox(), otherObject.getHitBox());
};


Skier.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Obstacle) {
    this.game.skiCrash();
  } else if (otherObject instanceof Ramp) {
    this.game.skiJump();
  }
}

Skier.prototype.draw = function (ctx) {
  if (this.game.isJumping) {
    this.pos[1] += 5*this.animationDir;
    if (this.pos[1] < 200) {
      this.animationDir = 1;
    }
  }
    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
}


module.exports = Skier;
