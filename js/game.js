var Ski = require('./ski'),
    SkiView = require('./skiView'),
    Loading = require('./loading');

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('ski');
  var ctx = canvas.getContext("2d");
  canvas.height = 600;
  canvas.width = 800;
  var game = new Ski();
  window.ski = game;
  var view = new SkiView(game, ctx);
  // var load = new Loading(ctx);
  // load.animate(view.start.bind(view));
  view.start();
});
