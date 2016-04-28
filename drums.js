var PARTICLES = 200,
	  INTERVAL = 60,
		canvaser = document.querySelector('#drums'),
		con = canvaser.getContext('2d'),
		gradient = null,
		drums = new Array();



//Circles

		function Circles() {
			
//			time_to_live – used to calculate hl–or the half-life–of each particle
//			x_maxspeed and y_maxspeed – defines the maximum number of pixels a particle can move each frame
//			radius_max – maximum radius a particle can achieve
//			rt – used in conjunction with hl to determine how the ratio of maximum speed and full opacity of each particle in each frame
			this.setting = {time_to_live:5000, xmax:randomFloat(100,200), ymax:randomFloat(100,200), rmax:5, rt:1, xdrift:4, ydrift: 4, blinker:randomFloat(0,100)};

			this.reseter = function() {
//			Initial position and radius
				this.x = WIDTH*Math.random();
				this.y = HEIGHT*Math.random();
				this.r = ((this.setting.rmax-1)*Math.random()) + 1;
				
//			Speed
//				this.dx = (Math.random()*this.setting.xmax) * (Math.random() < .5 ? -1 : 1);
//				this.dy = (Math.random()*this.setting.ymax) * (Math.random() < .5 ? -1 : 1);
				this.dx = 2 * (Math.random() < .5 ? -1 : 1);
				this.dy = 15 * -1;
				
//			The length of life of a particle and how the star fades
				this.hl = randomFloat(60,120); 
				this.rt = Math.random()*this.hl;
				this.setting.rt = Math.random()+1;
				
				this.stop = Math.random()*.2+.4;
				this.setting.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
				this.setting.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
			}

			this.fader = function() {
				this.rt += this.setting.rt;
			}

			this.drawed = function() {
				if(this.setting.blinker > 3 && (this.rt <= 0 || this.rt >= this.hl)) {
					this.setting.rt = this.setting.rt*-1;
				} else if(this.rt >= this.hl) {
					this.reseter();
				}

				var ne = 1-(this.rt/this.hl);
				con.beginPath();
				con.arc(this.x, this.y, this.r, 0, Math.PI*2);
				con.closePath();

				var ce = this.r*ne;
				gradient = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (ce <= 0 ? 1 : ce));
				gradient.addColorStop(0.0, 'rgba(255,255,255,'+ne+')');
				gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(ne*.6)+')');
				gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
				con.fillStyle = gradient;
				con.fill();
			}

			this.moveb = function() {
//				where the x, y end up
				this.x += (this.rt/this.hl)*this.dx;
				this.y += (this.rt/this.hl)*this.dy;
				if(this.x > WIDTH || this.x < 0) this.dx *= -1;
				if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
			}
			this.getX = function() { return this.x; }
			this.getY = function() { return this.y; }
		};
		for (var i = 0; i < PARTICLES; i++) {
			drums.push(new Circles());
			drums[i].reseter();
		}

setTimeout(function() {
		function drawers() {
			con.clearRect(0, 0, WIDTH, HEIGHT);
			for(var i = 0; i < drums.length; i++) {
				drums[i].fader();
				drums[i].moveb();
				drums[i].drawed();
			}
		};
			setInterval(drawers, INTERVAL)
},60*2000 + 24250);


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
	