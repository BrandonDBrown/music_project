	
	function randomFloat (min, max)
	{
		return min + Math.random()*(max-min);
	}
//Resizing for difference browser size
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight,
			MAX_PARTICLE = 1,
			DRAW_INTERVA = 60,
			container = document.querySelector('#container'),
			canvas = document.querySelector('#blink'),
			contexto = canvas.getContext('2d'),
			gradient = null,
			blinks = new Array();
			

		function setDimensions(e) {
			WIDTH = window.innerWidth;
			HEIGHT = window.innerHeight;
			container.style.width = WIDTH+'px';
			container.style.height = HEIGHT+'px';
			canvas.width = WIDTH;
			canvas.height = HEIGHT;
		}
		setDimensions();
		window.addEventListener('resize', setDimensions);

//Circles
		function Circles() {
			this.setting = {ttl:8000, xmax:0, ymax:0, rmax:50, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

			this.resetz = function() {
				this.x = (this.setting.random ? WIDTH*Math.random() : this.setting.xdef);
				this.y = (this.setting.random ? HEIGHT*Math.random() : this.setting.ydef);
				this.r = 10
//				this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
//				this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
				this.hl = (this.setting.ttl/DRAW_INTERVA)*(this.r/this.setting.rmax);
				this.rt = Math.random()*this.hl;
				this.setting.rt = Math.random()+1;
				this.stop = Math.random()*.2+.4;
//				this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
//				this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
			}

			this.fadeth = function() {
				this.rt += this.setting.rt;
			}

			this.drawer = function() {
				if(this.setting.blink && (this.rt <= 0 || this.rt >= this.hl)) {
//					this.setting.rt = this.setting.rt*-1;
//				} else if(this.rt >= this.hl) {
					this.resetz();

				}

				var newa = 1-(this.rt/this.hl);
				contexto.beginPath();
				contexto.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
				contexto.closePath();

				var cd = this.r*newa;
				gradients = contexto.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cd <= 0 ? 1 : cd));
				gradients.addColorStop(0.0, 'rgba(255,255,255,'+newa+')');
				gradients.addColorStop(this.stop, 'rgba(77,101,181,'+(newa*.6)+')');
				gradients.addColorStop(1.0, 'rgba(77,101,181,0)');
				contexto.fillStyle = gradients;
				contexto.fill();
			}


		}

		var audio = new Audio('transC.mp3');

			for (var i = 0; i < MAX_PARTICLE; i++) {
			blinks.push(new Circles());
			blinks[i].resetz();

		}

		function drawed() {
			contexto.clearRect(0, 0, WIDTH, HEIGHT);
			for(var i = 0; i < blinks.length; i++) {
				blinks[i].fadeth();
				audio.play();
//				blinks[i].move();
				blinks[i].drawer();
				
			}
		}
		setInterval(drawed, DRAW_INTERVA);



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
	