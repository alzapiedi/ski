var MovingObject = require('./movingObject'),
    Utils = require('./utils'),
    Obstacle = require('./obstacle');

var Skier = function (attr) {
  var pos = attr.pos;
  var game = attr.game;
  var img = attr.img;
  MovingObject.call(this, {pos: pos, vel: [0, 0], game: game, img: img});
}
Utils.inherits(Skier, MovingObject);


Skier.prototype.getHitBox = function () {
  var pos = this.pos;
  return {top: pos[1] + 10, bottom: pos[1] + 30, left: pos[0], right: pos[0] + 15};
}

Skier.prototype.isCollidedWith = function (otherObject) {
  return Utils.overlap(this.getHitBox(), otherObject.getHitBox());
};


Skier.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Obstacle) {
    this.game.skiCrash();
  }
}


module.exports = Skier;
