var Loading = function (ctx) {
  this.ctx = ctx;
  this.loadImages();
}

// Windows 95 intro animation

Loading.prototype.animate = function (callback) {
  this.img1.onload = function () {
    this.ctx.drawImage(this.img1,0,0,800,600);
    setTimeout(function () {
      this.ctx.drawImage(this.img2,0,0,800,600);
      this.ctx.drawImage(this.img3,300,400);
      setTimeout(this.mouseMove.bind(this), 1000);
      setTimeout(callback, 3300);
    }.bind(this), 4300);
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
  // 150, 335 Target mouse location
  var c_x = 300;
  var c_y = 400;
  var interval = setInterval(function () {
    c_x -= 6.9;
    c_y -= 3;
    this.ctx.drawImage(this.img2,0,0,800,600);
    this.ctx.drawImage(this.img3,c_x,c_y);
    if (c_y < 335) {
      clearInterval(interval);
      interval = 0;
    }
  }.bind(this), 50);
}

module.exports = Loading;
