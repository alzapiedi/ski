var MovingObject = require('./movingObject'),
    Utils = require('./utils');
var Yeti = function (attrs) {
  this.frameIndex = 1;
  this.startTime = Date.now();
  MovingObject.call(this, attrs);
}
Utils.inherits(Yeti, MovingObject);

Yeti.prototype.move = function (timeDelta) { // happens every 16ms ~> 60fps
  var skierPos = this.game.skier.pos;
  this.vel = Utils.vector(this.pos, skierPos);
  console.log(this.pos);
  this.pos[0] += this.vel[0] * timeDelta / (1000/60);
  this.pos[1] += this.vel[1] * timeDelta / (1000/60);

}

Yeti.prototype.draw = function (ctx) {
  var time = Date.now() - this.startTime;
  if (time > 100) {
    this.frameIndex += 1;
    this.startTime = Date.now();
    if (this.frameIndex > 2) { this.frameIndex = 1; }
  }
  ctx.drawImage(this.img, this.frameIndex * 32, 0, 32, 42, this.pos[0], this.pos[1], 32, 42);
}

Yeti.prototype.getHitBox = function () {
  var pos = this.pos;
  return {top: pos[1] + 10, left: pos[0] + 10, right: pos[0] + 20, bottom: pos[1] + 35};
}
module.exports = Yeti;
