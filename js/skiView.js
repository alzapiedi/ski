var Ski = require('./ski');

var SkiView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.stopped = false;
}

SkiView.prototype.start = function () {
  $('.newgame').off('click');
  this.bindKeyHandlers();
  this.bindSettingsHandler();
  this.lastTime = 0;
  this.animation = requestAnimationFrame(this.animate.bind(this));
  this.stopped = false;
}

SkiView.prototype.animate = function (time) {
  timeDelta = time - this.lastTime;
  this.game.step(timeDelta);
  this.game.draw(this.ctx, timeDelta);
  this.lastTime = time;
  if (!this.stopped) {
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }
}


SkiView.prototype.bindKeyHandlers = function () {
  var key;
  $(document).on('keydown', function (e) {
    key = e.keyCode;
    if (key > 36 && key < 41) {
      e.preventDefault();
      this.unbindSettingsHandler();
      this.game.changeDirection(e.keyCode);
    }
  }.bind(this));
}

SkiView.prototype.unbindKeyHandlers = function () {
  $(document).off('keydown');
  $('.newgame').off('click');
}

SkiView.prototype.bindSettingsHandler = function () {
  $('.options').css('display', 'block');
  $('.speed').on('click', function (e) {
    var s = parseInt(e.target.id.substring(5,6));
    $('.speed').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setSpeed(s);
  }.bind(this));
  $('.density').on('click', function (e) {
    var d = parseInt(e.target.id.substring(3,4));
    $('.density').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setDensity(d);
  }.bind(this));
  $('.monster').on('click', function (e) {
    var mon = parseInt(e.target.id.substring(3,4));
    $('.monster').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setMonster(mon);
  }.bind(this));
}

SkiView.prototype.unbindSettingsHandler = function () {
  $('.speed').off('click');
  $('.density').off('click');
  $('.monster').off('click');
  $('.options').css('display', 'none');
  $('.newgame').css('display', 'block');
  $('.newgame').on('click', function (e) {
    e.preventDefault();
    this.unbindKeyHandlers();
    this.game.over = true;
    this.stopped = true;
    cancelAnimationFrame(this.animation);
    this.game.stopObjectInterval();
    delete this.game;
    this.game = new Ski();
    $('.newgame').css('display', 'none');
    $('.options').css('display', 'block');
    this.start();
  }.bind(this));

}
module.exports = SkiView;
