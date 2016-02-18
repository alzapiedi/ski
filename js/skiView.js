var Ski = require('./ski');

var SkiView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.settingsActive = true;
  this.stopped = false;
}

SkiView.prototype.start = function () {
  $('.header').css('display', 'block');
  $('.newgame').off('click');
  $('.welcome').css('display','block');
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
      this.settingsActive && this.unbindSettingsHandler();  // added settingsActive so this is only called when the game states
      $('.welcome').css('display','none');
      this.game.changeDirection(e.keyCode);
    }
  }.bind(this));
}

SkiView.prototype.unbindKeyHandlers = function () {
  $(document).off('keydown');
  $('.newgame').off('click');
}

SkiView.prototype.bindSettingsHandler = function () {
  this.settingsActive = true;
  $('.options').css('display', 'block');
  // jQuery click handler -- Speed setting
  $('.speed').on('click', function (e) {
    var s = parseInt(e.target.id.substring(5,6));
    $('.speed').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setSpeed(s);
  }.bind(this));

  // jQuery click handler -- Obj Density setting
  $('.density').on('click', function (e) {
    var d = parseInt(e.target.id.substring(3,4));
    $('.density').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setDensity(d);
  }.bind(this));

  // jQuery click handler -- SnowMonster setting
  $('.monster').on('click', function (e) {
    var mon = parseInt(e.target.id.substring(3,4));
    $('.monster').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setMonster(mon);
  }.bind(this));

  // jQuery click handler -- Physics setting
  $('.physics').on('click', function (e) {
    var p = parseInt(e.target.id.substring(4,5));
    $('.physics').children().each(function (i, el) {
      $(el).removeClass();
    });
    $(e.target).addClass('selected');
    this.game.setPhysics(p);
    var s = p ? "enable" : "disable";
    $('#slider').slider(s);
  }.bind(this));

  //jQuery UI slider to control friction
    $('#slider').slider({
    min: -50,
    max: -1,
    value: -15
  });
  $('#slider').on('slidechange', function (event, ui) {
    this.game.setFriction(Math.abs(ui.value));
  }.bind(this));

}

SkiView.prototype.unbindSettingsHandler = function () {
  this.settingsActive = false;
  // Prevent alteration of settings during play
  $('.speed').off('click');
  $('.density').off('click');
  $('.monster').off('click');
  $('.physics').off('click');
  $('#slider').off('slidechange');     // Seems like both of these need to be called to
  $('#slider').slider('destroy');      // fully eliminate the event handler.
  $('.options').css('display', 'none');
  $('.newgame').css('display', 'block');

  // new click handler for restart button
  $('.newgame').on('click', function (e) {
    e.preventDefault();
    this.unbindKeyHandlers();
    this.game.over = true;
    this.stopped = true;
    var g = this.game;
    var gameSettings = {
      speed: g.speed,
      density: g.density,
      monster: g.monster,
      physics: g.physics
    }
    cancelAnimationFrame(this.animation);
    this.game.stopObjectInterval();
    delete this.game;
    this.game = new Ski(gameSettings);
    $('.newgame').css('display', 'none');
    $('.options').css('display', 'block');  // new game is loaded, show settings menu again
    this.start();
  }.bind(this));

}
module.exports = SkiView;
