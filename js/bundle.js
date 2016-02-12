/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Ski = __webpack_require__(1),
	    SkiView = __webpack_require__(7),
	    Loading = __webpack_require__(8);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(2),
	    Utils = __webpack_require__(3),
	    Skier = __webpack_require__(4),
	    Obstacle = __webpack_require__(5),
	    Ramp = __webpack_require__(6),
	    Yeti = __webpack_require__(9);
	
	var Ski = function () {
	  this.loadImages();
	  this.obstacles = [];
	  this.god = false;
	  this.ramps = [];
	  this.crashed = false;
	  this.canCrash = true;
	  this.direction = 3;
	  this.speed = 1;
	  this.density = 1;
	  this.isJumping = false;
	  this.timerStart = Date.now();
	  this.distance = 0;
	  this.over = false;
	  this.monster = true;
	  // skiImg.onload = function () {
	  this.skier = new Skier({pos: [400, 300], game: this, img: this.skierImgs[3]});
	  // }.bind(this);
	
	  this.startObjectInterval();
	}
	
	Ski.prototype.setSpeed = function (s) {
	  this.stopObjectInterval();
	  this.speed = s;
	  this.updateVelocities();
	  this.startObjectInterval();
	}
	
	Ski.prototype.setDensity = function (d) {
	  this.stopObjectInterval();
	  this.density = d;
	  this.startObjectInterval()
	}
	
	Ski.prototype.vels = function () {
	  var s = this.speed;
	  var vels = {
	    3: [0,0],
	    4: [-3 * s, -2 * s],
	    5: [-2 * s, -3 * s],
	    6: [0, -3.5 * s],
	    7: [2 * s, -3 * s],
	    8: [3 * s, -2 * s],
	    9: [0,0],
	    10: [0,0]
	  };
	    return vels;
	}
	
	Ski.prototype.remove = function (object) {
	  if(object instanceof Obstacle){
	    var i = this.obstacles.indexOf(object);
	    this.obstacles.splice(i, 1);
	  } else if (false) {
	
	  }
	};
	
	Ski.prototype.isMoving = function () {
	  var moving = this.direction > 3 && this.direction < 9;
	  if (!moving) { this.restartTimer(); }
	  return moving;
	}
	
	Ski.prototype.restartTimer = function () {
	  this.timerStart = Date.now();
	}
	
	Ski.prototype.getTimer = function () {
	  if (this.isMoving()) {
	    this.timerNow = Math.floor((Date.now() - this.timerStart)/1000) + "s";
	  }
	  return this.timerNow;
	}
	
	Ski.prototype.killSkier = function () {
	
	}
	
	
	Ski.prototype.loadImages = function () {
	  var ski3 = new Image();
	  var ski4 = new Image();
	  var ski5 = new Image();
	  var ski6 = new Image();
	  var ski7 = new Image();
	  var ski8 = new Image();
	  var ski9 = new Image();
	  var ski10 = new Image();
	  var skiCrash = new Image();
	  var skiJump = new Image();
	  var tree1 = new Image();
	  var tree2 = new Image();
	  var tree3 = new Image();
	  var rock = new Image();
	  var ramp = new Image();
	  var banner = new Image();
	  var yeti = new Image();
	  var eat = new Image();
	
	  yeti.src = 'img/yeti.png';
	  ski3.src = 'img/skier3.png';
	  ski4.src = 'img/skier4.png';
	  ski5.src = 'img/skier5.png';
	  ski6.src = 'img/skier6.png';
	  ski7.src = 'img/skier7.png';
	  ski8.src = 'img/skier8.png';
	  ski9.src = 'img/skier9.png';
	  ski10.src = 'img/skier10.png';
	  skiCrash.src = 'img/skicrash.png';
	  skiJump.src = 'img/skijump.png';
	  tree1.src = 'img/tree1.png';
	  tree2.src = 'img/tree2.png';
	  tree3.src = 'img/tree3.png';
	  rock.src = 'img/rock.png';
	  ramp.src = 'img/ramp.png';
	  banner.src = 'img/banner.png';
	  eat.src = 'img/eat.png';
	  this.skierImgs = {3: ski3, 4: ski4, 5: ski5, 6: ski6, 7: ski7, 8: ski8, 9: ski9, 10: ski10, crash: skiCrash, jump: skiJump, eat: eat};
	  this.obstacleImgs = {0: tree1, 1: tree2, 2: tree3, 3: rock};
	  this.rampImg = ramp;
	  this.banner = banner;
	  this.yetiImg = yeti;
	}
	
	Ski.prototype.allObjects = function () {
	  var obj = this.obstacles.concat(this.ramps);
	  if (this.yeti) { obj = obj.concat(this.yeti); }
	  return obj;
	}
	
	Ski.prototype.startObjectInterval = function () {
	  this.objInterval = setInterval(function () {
	    if ( this.direction > 3 && this.direction < 9 ) {
	      this.addObject();
	    }
	  }.bind(this), (250/this.speed)/this.density);
	}
	
	Ski.prototype.stopObjectInterval = function () {
	  clearInterval(this.objInterval);
	  this.objInterval = 0;
	}
	
	Ski.prototype.randomPosition = function () {
	  var x = Math.floor(Math.random() * 1000) - 100;
	  x += (6 - this.direction) * 200;
	  return [x, 600];
	}
	
	Ski.prototype.draw = function (ctx, timeDelta) {
	  ctx.clearRect(0,0,800,600);
	  ctx.font="20px Helvetica";
	  var timer = this.getTimer() || "0s";
	  var distance = Math.floor(this.distance) + "ft";
	  if (!this.isJumping) { this.skier.draw(ctx, timeDelta); }
	  this.allObjects().forEach(function (obj) {
	    obj.draw(ctx);
	  });
	  if (this.isJumping) { this.skier.draw(ctx, timeDelta); }
	  ctx.drawImage(this.banner, 0, 0);
	  ctx.fillText(timer + " / " + distance,680,55);
	}
	
	Ski.prototype.moveObjects = function (timeDelta) {
	  this.allObjects().forEach(function (obj) {
	    obj.move(timeDelta);
	  });
	}
	
	Ski.prototype.shiftObjects = function (n) {
	  this.allObjects().forEach(function (obj) {
	    obj.shift(n);
	  });
	}
	
	Ski.prototype.enableGodMode = function () {
	  this.god = true;
	}
	
	Ski.prototype.disableGodMode = function () {
	  this.god = false;
	}
	
	Ski.prototype.setMonster = function (mon) {
	  this.monster = !!mon;
	}
	
	Ski.prototype.step = function (timeDelta) {
	  if (!this.over) {
	    var vel = this.vels()[this.direction];
	    this.distance -= vel[1] / 13;
	    if (this.distance > 100 && !this.yeti && this.monster) {   // MAKE 2500
	      var r = Math.floor(Math.random() * 1000);
	      if (r === 666) {
	        this.bringOutTheYeti();
	      }
	    }
	    this.moveObjects(timeDelta);
	    this.checkCollisions();
	  }
	}
	
	Ski.prototype.bringOutTheYeti = function () {
	  var vel = this.vels()[this.direction];
	  this.yeti = new Yeti({pos: [0, 200], vel: vel, game: this, img: this.yetiImg});
	}
	
	Ski.prototype.checkCollisions = function () {
	  var obj = this.allObjects();
	  for (var i = 0; i < obj.length; i++) {
	    if (this.skier.isCollidedWith(obj[i])) {
	      this.skier.collideWith(obj[i]);
	    }
	  }
	}
	
	Ski.prototype.addObject = function () {
	  var i = Math.floor(Math.random() * 10);
	  if (i > 2) {
	    var j = Math.floor(Math.random() * 4);
	    var obstacle = new Obstacle({
	      pos: this.randomPosition(),
	      vel: this.vels()[this.direction],
	      game: this,
	      img: this.obstacleImgs[j],
	      style: j
	    });
	    this.obstacles.push(obstacle);
	  } else {
	    var ramp = new Ramp({
	      pos: this.randomPosition(),
	      vel: this.vels()[this.direction],
	      game: this,
	      img: this.rampImg
	    });
	    this.ramps.push(ramp);
	  }
	}
	
	Ski.prototype.updateVelocities = function () {
	  var vel = this.vels()[this.direction];
	  this.allObjects().forEach(function (obj) {
	    obj.vel = vel;
	  }.bind(this));
	}
	
	Ski.prototype.changeDirection = function (keyCode) {  //37 left   39 right
	  if (!this.crashed && !this.isJumping && !this.over) {
	    var dir = this.direction;
	    if (dir === 10) {
	      setTimeout(function () {
	        this.canCrash = true;
	      }.bind(this), 1000)
	    }
	    if (keyCode === 37 && dir === 3) {
	      this.direction = 9;
	    } else if (keyCode === 37 && dir > 3 && dir < 9) {
	      this.direction += 1;
	    } else if (keyCode === 39 && dir === 9) {
	      this.direction = 3;
	    } else if (keyCode === 39 && dir > 3 && dir < 9) {
	      this.direction -= 1;
	    } else if (keyCode === 40) {
	      this.direction = 6;
	    } else if (keyCode === 37 && dir === 9) {
	      this.shiftObjects(10);
	    } else if (keyCode === 39 && dir === 3) {
	      this.shiftObjects(-10);
	    } else {
	      return;
	    }
	    this.skier.img = this.skierImgs[this.direction];
	    this.updateVelocities();
	  }
	}
	
	Ski.prototype.skiCrash = function () {
	  this.stopObjectInterval();
	  this.direction = 10;
	  this.skier.img = this.skierImgs["crash"];
	  this.crashed = true;
	  this.canCrash = false;
	  this.allObjects().forEach(function (obj) {
	    obj.vel = [0, 0];
	  });
	  setTimeout(function () {
	    this.crashed = false;
	    this.skier.img = this.skierImgs[this.direction];
	    this.updateVelocities();
	    this.startObjectInterval();
	  }.bind(this), 1000);
	}
	
	Ski.prototype.skiJump = function () {
	  this.isJumping = true;
	  this.direction = 6;
	  this.updateVelocities();
	  this.canCrash = false;
	  this.skier.img = this.skierImgs["jump"];
	  setTimeout(function () {
	    this.isJumping = false;
	    this.canCrash = true;
	    this.direction = 6;
	    this.skier.img = this.skierImgs[this.direction];
	    this.skier.animationDir = -1;
	    this.skier.pos = [400, 300];
	  }.bind(this), 2000);
	}
	
	Ski.prototype.killSkier = function () {
	  this.over = true;
	  this.yeti = null;
	  this.skier.img = this.skierImgs["eat"];
	  this.direction = 10;
	}
	
	
	module.exports = Ski;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	
	var MovingObject = function (attr) {
	  this.pos = attr.pos;
	  this.vel = attr.vel;
	  this.game = attr.game;
	  this.img = attr.img;
	}
	
	MovingObject.prototype.move = function (timeDelta) {
	  if (!this.vel) { debugger; }
	  this.pos[0] += this.vel[0] * timeDelta / (1000/60);
	  this.pos[1] += this.vel[1] * timeDelta / (1000/60);
	  if (this.pos[1] < -50) {
	    this.game.remove(this);
	  }
	}
	
	MovingObject.prototype.shift = function (n) {
	  this.pos[0] += n;
	}
	
	MovingObject.prototype.draw = function (ctx) {
	  ctx.drawImage(this.img, this.pos[0], this.pos[1]);
	}
	
	
	module.exports = MovingObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	  return [vec_x/Math.abs(vec_x), vec_y/Math.abs(vec_x)];
	}
	
	
	window.Utils = Utils;
	module.exports = Utils;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(2),
	    Utils = __webpack_require__(3),
	    Obstacle = __webpack_require__(5),
	    Ramp = __webpack_require__(6),
	    Yeti = __webpack_require__(9);
	
	var Skier = function (attr) {
	  var pos = attr.pos;
	  var game = attr.game;
	  var img = attr.img;
	  this.frameIndex = 0;
	  this.animationDir = -1;
	  MovingObject.call(this, {pos: pos, vel: [0, 0], game: game, img: img});
	}
	Utils.inherits(Skier, MovingObject);
	
	
	Skier.prototype.getHitBox = function () {
	  var pos = this.pos;
	  return {top: pos[1] + 15, bottom: pos[1] + 30, left: pos[0] + 5, right: pos[0] + 15};
	}
	
	Skier.prototype.isCollidedWith = function (otherObject) {
	  if (this.game.god) { return false; }
	  return Utils.overlap(this.getHitBox(), otherObject.getHitBox());
	};
	
	
	Skier.prototype.collideWith = function (otherObject) {
	  if (otherObject instanceof Obstacle && this.game.canCrash  && !this.game.isJumping) {
	    this.game.skiCrash();
	  } else if (otherObject instanceof Ramp && !this.game.isJumping) {
	    this.game.skiJump();
	  } else if (otherObject instanceof Yeti && !this.game.isJumping) {
	    this.game.killSkier();
	  }
	}
	
	Skier.prototype.draw = function (ctx, timeDelta) {
	  if (!this.game.over) {
	    if (this.game.isJumping) {
	      this.pos[1] += (timeDelta/(1000/60))*this.animationDir*1.6;
	      if (this.pos[1] < 200) {
	        this.animationDir = 1;
	      }
	    }
	    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
	  } else {
	    this.startTime = this.startTime || Date.now();
	    var time = Date.now() - this.startTime;
	    if (time > 100) {
	      this.frameIndex += 1;
	      this.startTime = Date.now();
	      if (this.frameIndex > 4) { this.frameIndex = 4; }
	    }
	    ctx.drawImage(this.img, this.frameIndex * 35, 0, 35, 43, this.pos[0], this.pos[1], 35, 43);
	  }
	}
	
	
	module.exports = Skier;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(2),
	    Utils = __webpack_require__(3);
	
	var Obstacle = function (attr) {
	  this.style = attr.style;
	  MovingObject.call(this, attr);
	}
	Utils.inherits(Obstacle, MovingObject);
	
	Obstacle.prototype.getHitBox = function () {
	  var pos = this.pos;
	  if (this.style === 0) {
	    return {top: pos[1] + 42, bottom: pos[1] + 60, left: pos[0] + 10, right: pos[0] + 25};
	  } else if (this.style === 1) {
	    return {top: pos[1] + 17, bottom: pos[1] + 30, left: pos[0] + 6, right: pos[0] + 15};
	  } else if (this.style === 2) {
	    return {top: pos[1] + 18, bottom: pos[1] + 30, left: pos[0] + 11, right: pos[0] + 19};
	  } else {
	    return {top: pos[1] + 5, bottom: pos[1] + 12, left: pos[0], right: pos[0] + 15};
	  }
	}
	
	
	
	module.exports = Obstacle;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(2),
	    Utils = __webpack_require__(3);
	
	var Ramp = function (attr) {
	  MovingObject.call(this,attr);
	}
	
	Utils.inherits(Ramp, MovingObject);
	
	Ramp.prototype.getHitBox = function () {
	  var pos = this.pos;
	  return {top: pos[1], bottom: pos[1] + 5, left: pos[0], right: pos[0] + 25};
	}
	
	module.exports = Ramp;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Ski = __webpack_require__(1);
	
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


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Loading = function (ctx) {
	  this.ctx = ctx;
	  this.loadImages();
	}
	
	Loading.prototype.animate = function (callback) {
	  this.img1.onload = function () {
	    this.ctx.drawImage(this.img1,0,0,800,600);
	    setTimeout(function () {
	      this.ctx.drawImage(this.img2,0,0,800,600);
	      this.ctx.drawImage(this.img3,300,400);
	      this.mouseMove();
	      setTimeout(callback, 3000);
	    }.bind(this), 4000);
	  }.bind(this);
	}
	
	Loading.prototype.loadImages = function () {
	  var img1 = new Image();
	  img1.src = 'img/w95.png';
	  this.img1 = img1;
	  var img2 = new Image();
	  img2.src = 'img/w95d.png';
	  this.img2 = img2;
	  var img3 = new Image();
	  img3.src = 'img/cursor.png';
	  this.img3 = img3;
	}
	
	Loading.prototype.mouseMove = function () {
	  // 150, 335
	  var c_x = 300;
	  var c_y = 400;
	  var interval = setInterval(function () {
	    c_x -= 4.6;
	    c_y -= 2;
	    this.ctx.drawImage(this.img2,0,0,800,600);
	    this.ctx.drawImage(this.img3,c_x,c_y);
	    if (c_y < 335) {
	      clearInterval(interval);
	      interval = 0;
	    }
	  }.bind(this), 50);
	}
	
	module.exports = Loading;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(2),
	    Utils = __webpack_require__(3);
	var Yeti = function (attrs) {
	  this.frameIndex = 1;
	  this.startTime = Date.now();
	  MovingObject.call(this, attrs);
	}
	Utils.inherits(Yeti, MovingObject);
	
	Yeti.prototype.move = function (timeDelta) { // happens every 16ms ~> 60fps
	  var skierPos = this.game.skier.pos;
	  this.vel = Utils.vector(this.pos, skierPos);
	  console.log(this.pos);
	  this.pos[0] += this.vel[0] * timeDelta / (1000/60);
	  this.pos[1] += this.vel[1] * timeDelta / (1000/60);
	
	}
	
	Yeti.prototype.draw = function (ctx) {
	  var time = Date.now() - this.startTime;
	  if (time > 100) {
	    this.frameIndex += 1;
	    this.startTime = Date.now();
	    if (this.frameIndex > 2) { this.frameIndex = 1; }
	  }
	  ctx.drawImage(this.img, this.frameIndex * 32, 0, 32, 42, this.pos[0], this.pos[1], 32, 42);
	}
	
	Yeti.prototype.getHitBox = function () {
	  var pos = this.pos;
	  return {top: pos[1] + 10, left: pos[0] + 10, right: pos[0] + 20, bottom: pos[1] + 35};
	}
	module.exports = Yeti;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map