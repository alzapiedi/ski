var Utils = require('./utils');

var MovingObject = function (attr) {
  this.pos = attr.pos;
  this.vel = attr.vel;
  this.game = attr.game;
  this.img = attr.img;
}

MovingObject.prototype.move = function (timeDelta) {
  this.pos[0] += this.vel[0] * timeDelta / (1000/60);
  this.pos[1] += this.vel[1] * timeDelta / (1000/60);
  if (this.pos[1] < -50) {
    this.game.remove(this);
  }
}

MovingObject.prototype.shift = function (n) {
  this.pos[0] += n;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, this.pos[0], this.pos[1]);
}


module.exports = MovingObject;
