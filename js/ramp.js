var MovingObject = require('./movingObject'),
    Utils = require('./utils');

var Ramp = function (attr) {
  MovingObject.call(this,attr);
}

Utils.inherits(Ramp, MovingObject);

Ramp.prototype.getHitBox = function () {
  var pos = this.pos;
  return {top: pos[1], bottom: pos[1] + 5, left: pos[0], right: pos[0] + 25};
}

module.exports = Ramp;
