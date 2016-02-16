var MovingObject = require('./movingObject'),
    Utils = require('./utils');

var Obstacle = function (attr) {
  this.style = attr.style;
  this.id = attr.id;
  MovingObject.call(this, attr);
}
Utils.inherits(Obstacle, MovingObject);

Obstacle.prototype.getHitBox = function () {
  // Four styles of obstacle
  // 0 - Tall tree
  // 1 - small gree tree
  // 2 - brown tree
  // 3 - rock
  var pos = this.pos;
  if (this.style === 0) {
    return {top: pos[1] + 42, bottom: pos[1] + 60, left: pos[0] + 10, right: pos[0] + 25};
  } else if (this.style === 1) {
    return {top: pos[1] + 17, bottom: pos[1] + 30, left: pos[0] + 6, right: pos[0] + 18};
  } else if (this.style === 2) {
    return {top: pos[1] + 18, bottom: pos[1] + 30, left: pos[0] + 11, right: pos[0] + 19};
  } else {
    return {top: pos[1] + 5, bottom: pos[1] + 12, left: pos[0], right: pos[0] + 18};
  }
}



module.exports = Obstacle;
