var MovingObject = require('./movingObject'),
    Utils = require('./utils');

var Obstacle = function (attr) {
  this.style = attr.style;
  MovingObject.call(this, attr);
}
Utils.inherits(Obstacle, MovingObject);

Obstacle.prototype.getHitBox = function () {
  var pos = this.pos;
  if (this.style === 0) {
    return {top: pos[1] + 20, bottom: pos[1] + 60, left: pos[0] + 10, right: pos[0] + 25};
  } else if (this.style === 1) {
    return {top: pos[1] + 12, bottom: pos[1] + 30, left: pos[0], right: pos[0] + 15};
  } else if (this.style === 2) {
    return {top: pos[1] + 10, bottom: pos[1] + 30, left: pos[0], right: pos[0] + 15};
  } else {
    return {top: pos[1] + 5, bottom: pos[1] + 12, left: pos[0], right: pos[0] + 15};
  }
}



module.exports = Obstacle;
