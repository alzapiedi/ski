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

Utils.overlap = function (r1, r2) {
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}



module.exports = Utils;
