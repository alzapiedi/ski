var Ski = require('./ski'),
    SkiView = require('./skiView');

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('ski');
  var ctx = canvas.getContext("2d");
  canvas.height = 600;
  canvas.width = 800;
  var game = new Ski();
  window.ski = game;
  var view = new SkiView(game, ctx);
  view.start();
});
