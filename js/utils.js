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

Utils.vector = function (pos1, pos2) {
  var vec_x = pos2[0] - pos1[0];
  var vec_y = pos2[1] - pos1[1];
  var normal = Math.abs(vec_x) > Math.abs(vec_y) ? Math.abs(vec_x) : Math.abs(vec_y);
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
