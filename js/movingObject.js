var Utils = require('./utils');

var MovingObject = function (attr) {
  this.pos = attr.pos;
  this.vel = attr.vel;
  this.game = attr.game;
  this.img = attr.img;
}

MovingObject.prototype.move = function () {
  if (!this.vel) { debugger; }
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.pos[1] < 0) {
    this.game.remove(this);
  }
}

MovingObject.prototype.setVel = function (vel) {
  this.vel = vel;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, this.pos[0], this.pos[1]);
}


module.exports = MovingObject;
