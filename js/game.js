var Ski = require('./ski'),
    SkiView = require('./skiView'),
    Loading = require('./loading');

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('ski');
  var ctx = canvas.getContext("2d");
  canvas.height = 600;
  canvas.width = 800;
  var gameSettings = {speed: 1, density: 2, monster: true, physics: true} // Four game settings
  var game = new Ski(gameSettings);
  window.ski = game;
  var view = new SkiView(game, ctx);
  // var load = new Loading(ctx);
  // load.animate(view.start.bind(view));
  view.start();
});
