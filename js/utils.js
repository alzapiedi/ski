var Utils = {};

Utils.inherits = function (subclass, parentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = parentClass.prototype;
  subclass.prototype = new Surrogate();
  subclass.prototype.constructor = subclass;
}

Utils.arrayEquals = function (arr1, arr2) {
  if (!arr1 || !arr2) {
    return false;
  }
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

Utils.arrayAdd = function (arr1, arr2) {
  return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
}

Utils.overlap = function (r1, r2) {
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

Utils.vector = function (pos1, pos2) {  // Calculates a direction vector between 2 positions, and
  var vec_x = pos2[0] - pos1[0];        // normalizes it to always have a max x or y magnitude of 1.
  var vec_y = pos2[1] - pos1[1];
  var dx = Math.abs(vec_x);
  var dy = Math.abs(vec_y);
  var normal = dx > dy ? dx : dy;
  return [vec_x/normal, vec_y/normal];
}

Utils.scale = function (vector, scaleF) {
  return [vector[0] * scaleF, vector[1] * scaleF];
}

Utils.distance = function (pos1, pos2) {
  var dx = pos1[0] - pos2[0];
  var dy = pos1[1] - pos2[1];
  return Math.sqrt(dx * dx + dy * dy);
}



window.Utils = Utils;
module.exports = Utils;
