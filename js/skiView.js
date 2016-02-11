var SkiView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

SkiView.prototype.start = function () {
  this.bindKeyHandlers();
  var callback = function () {
    this.game.draw(this.ctx);
    this.game.step();
  }
  setInterval(callback.bind(this), 50);
}

SkiView.prototype.bindKeyHandlers = function () {
  var key;
  $(document).on('keydown', function (e) {
    key = e.keyCode;
    if (key > 36 && key < 41) {
      e.preventDefault();
      this.game.changeDirection(e.keyCode);
    }
  }.bind(this));
  $('.options').on('click', function (e) {
    var s = parseInt(e.target.id.substring(5,6));
    this.game.setSpeed(s);
  }.bind(this));
}
module.exports = SkiView;
