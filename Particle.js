var MAX_PARTICLES = 200,
	  DRAW_INTERVAL = 60,
		context = canvas.getContext('2d'),
		gradient = null,
		pixies = new Array();


//Circles

		function Circle() {
			
//			time_to_live – used to calculate hl–or the half-life–of each particle
//			x_maxspeed and y_maxspeed – defines the maximum number of pixels a particle can move each frame
//			radius_max – maximum radius a particle can achieve
//			rt – used in conjunction with hl to determine how the ratio of maximum speed and full opacity of each particle in each frame
			this.settings = {time_to_live:5000, xmax:randomFloat(100,200), ymax:randomFloat(100,200), rmax:5, rt:1, xdrift:4, ydrift: 4, blink:randomFloat(0,100)};

			this.reset = function() {
//			Initial position and radius
				this.x = WIDTH*Math.random();
				this.y = HEIGHT*Math.random();
				this.r = ((this.settings.rmax-1)*Math.random()) + 1;
				
//			Speed
//				this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
//				this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
				this.dx = 0.80 * (Math.random() < .5 ? -1 : 1);
				this.dy = 0.80 * (Math.random() < .5 ? -1 : 1);
				
//			The length of life of a particle and how the star fades
				this.hl = randomFloat(60,120); 
				this.rt = Math.random()*this.hl;
				this.settings.rt = Math.random()+1;
				
				this.stop = Math.random()*.2+.4;
				this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
				this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
			}

			this.fade = function() {
				this.rt += this.settings.rt;
			}

			this.draw = function() {
				if(this.settings.blink > 3 && (this.rt <= 0 || this.rt >= this.hl)) {
					this.settings.rt = this.settings.rt*-1;
				} else if(this.rt >= this.hl) {
					this.reset();
				}

				var newo = 1-(this.rt/this.hl);
				context.beginPath();
				context.arc(this.x, this.y, this.r, 0, Math.PI*2);
				context.closePath();

				var cr = this.r*newo;
				gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
				gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
				gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
				gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
				context.fillStyle = gradient;
				context.fill();
			}

			this.move = function() {
//				where the x, y end up
				this.x += (this.rt/this.hl)*this.dx;
				this.y += (this.rt/this.hl)*this.dy;
				if(this.x > WIDTH || this.x < 0) this.dx *= -1;
				if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
			}
			this.getX = function() { return this.x; }
			this.getY = function() { return this.y; }
		};
		for (var i = 0; i < MAX_PARTICLES; i++) {
			pixies.push(new Circle());
			pixies[i].reset();
		}

setTimeout(function() {
		function draw() {
			context.clearRect(0, 0, WIDTH, HEIGHT);
			for(var i = 0; i < pixies.length; i++) {
				pixies[i].fade();
				pixies[i].move();
				pixies[i].draw();
			}
		};
			setInterval(draw, DRAW_INTERVAL)
},32500);


//mouse commands
//		$(document).ready(function(){
//			var $mountains = $('#mountains');
//			var $grass = $('#grass');
//			var $container = $('#container');
//			$container.mousedown(function(ev){
//				var ox = ev.clientX;
//				var om = parseInt($mountains.css('background-position').substr(0, $mountains.css('background-position').search(' ')));
//				var og = parseInt($grass.css('background-position').substr(0, $grass.css('background-position').search(' ')));
//				$container.mousemove(function(e){
//					$mountains.css('background-position', om+((e.clientX-ox)/10)+'px 0px');
//					$grass.css('background-position', og+((e.clientX-ox)/4)+'px 10px');
//				});
//				$container.mouseup(function(){
//					$container.unbind('mousemove');
//					$container.unbind('mouseup');
//				});
//			});
//		});
	