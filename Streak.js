  (function () {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
              window.setTimeout(callback, 1000 / 60);

          };
      window.requestAnimationFrame = requestAnimationFrame;
  })();

	function randomFloat (min, max)
	{
		return min + Math.random()*(max-min);
	}
var audio = new Audio('streak.mp3');

//  // Terrain stuff.
  var background = document.getElementById("bgCanvas"),
      bgCtx = background.getContext("2d"),
      width = window.innerWidth,
      height = document.body.offsetHeight;
//
  (height < 400) ? height = 400 : height;
//
  background.width = width;
  background.height = height;


  // stars
  function Star(options) {
      this.size = Math.random() * 0.1;
      this.speed = Math.random() * .05;
      this.x = options.x;
      this.y = options.y;
  }

  Star.prototype.reset = function () {
      this.size = Math.random() * 0.1;
      this.speed = Math.random() * .05;
      this.x = width;
      this.y = Math.random() * height;

  }

  Star.prototype.update = function () {
      this.x -= this.speed;
      if (this.x < 0) {
          this.reset();
      } else {
//          bgCtx.fillRect(this.x, this.y, this.size, this.size);
      }
  }

  function ShootingStar() {
      this.reset();

  }

  ShootingStar.prototype.reset = function () {
      this.x = Math.random() * width;
      this.y = 0;
      this.len = 75;
      this.speed = 7;
      this.size = .4;
      // this is used so the shooting stars arent constant
      this.waitTime = new Date().getTime() + (Math.random() * randomFloat(10000,15000)) + 500;
      this.active = false;

  }
  ShootingStar.prototype.update = function () {
      if (this.active) {
          this.x -= this.speed;
          this.y += this.speed;
					
          if (this.x < 0 || this.y >= height) {
              this.reset();
          } else {
              bgCtx.lineWidth = this.size;
              bgCtx.beginPath();
              bgCtx.moveTo(this.x, this.y);
              bgCtx.lineTo(this.x + this.len, this.y - this.len);
              bgCtx.stroke();
							audio.play();

          }
      } else {
          if (this.waitTime < new Date().getTime()) {
              this.active = true;
          }
      }
  }

  var entities = [];

  // init the stars
  for (var i = 0; i < height; i++) {
      entities.push(new Star({
          x: Math.random() * width,
          y: Math.random() * height
      }));
  }

  // Add 2 shooting stars that just cycle.
		entities.push(new ShootingStar());
//  	entities.push(new ShootingStar());

  //animate background
  function animate() {
      bgCtx.clearRect(0, 0, width, height);
      bgCtx.fillStyle = '#ffffff';
			bgCtx.strokeStyle = '#ffffff';
      var entLen = entities.length;

      while (entLen--) {
          entities[entLen].update();
      }
      requestAnimationFrame(animate);
  }

  animate();