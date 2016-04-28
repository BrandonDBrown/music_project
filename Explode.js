
	var canvas;
	var context2D;
	var particles = [];
	var audioz;
	var audio_files = ["E.mp3", "G.mp3", "A.mp3", "C.mp3"]

	
//A single explosion particle
	function Particle() {
		this.scale = 1.0;
		this.x = 0;
		this.y = 0;
		this.radius = 100;
		this.color = "#000";
		this.velocityX = 0;
		this.velocityY = 0;
		this.scaleSpeed = 0.05;
		
		this.update = function(ms)
		{
			// shrinking
			this.scale -= this.scaleSpeed * ms / 1000.0;
			
			if (this.scale <= 0)
			{
				this.scale = 0;
			}
			
			// moving away from explosion center
			this.x += this.velocityX * ms/randomFloat(1000, 3500);
			this.y += this.velocityY * ms/randomFloat(1000, 3500);
//				this.x = WIDTH*Math.random();
//				this.y = HEIGHT*Math.random();
		};
		
		this.draw = function(context2D)
		{
			// translating the 2D context to the particle coordinates
			context2D.save();
			context2D.translate(this.x, this.y);
			context2D.scale(this.scale, this.scale);
			
			// drawing a filled circle in the particle's local space
			context2D.beginPath();
			context2D.arc(0, 0, this.radius, 0, Math.PI*2, true);
			context2D.closePath();
			
			context2D.fillStyle = this.color;
			context2D.fill();
			
			context2D.restore();
		};
	}
	
	/*
	 * Basic Explosion, all particles move and shrink at the same speed.
	 * 
	 * Parameter : explosion center
	 */

	
	/*
	 * Advanced Explosion effect
	 * Each particle has a different size, move speed and scale speed.
	 * 
	 * Parameters:
	 * 	x, y - explosion center
	 * 	color - particles' color
	 */
	function createExplosion(x, y, color)
	{
		var minSize = 1;
		var maxSize = 5;
		var count = 10;
		var minSpeed = 60.0;
		var maxSpeed = 200.0;
		var minScaleSpeed = 1.0;
		var maxScaleSpeed = 4.0;
		
		
		for (var angle=0; angle<360; angle += Math.round(360/count)) {
			var particle = new Particle();
			
			particle.x = x;
			particle.y = y;
			
			particle.radius = randomFloat(minSize, maxSize);
			
			particle.color = color;
			
			particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
			
			var speed = randomFloat(minSpeed, maxSpeed);
			
			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
			
			particles.push(particle);
			
			var random_file = audio_files[Math.floor(randomFloat(0,4))];
			audioz = new Audio(random_file);
		}
	}
	
	function update (frameDelay) {
		context2D = canvas.getContext("2d");
		canvas = document.getElementById("canvas");
		context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);
		// update and draw particles
		for (var i=0; i<particles.length; i++) {
			var particle = particles[i];
			particle.update(frameDelay);
			particle.draw(context2D);
		}
	}
	

	// BOOM !
		setInterval(function() {
			var x = randomFloat(0, width);
			var y = randomFloat(0, height);
			createExplosion(x, y, "#becae4");
			createExplosion(x, y, "#becae4");
			audioz.play();
		},randomFloat(9000,12000));




		// starting the game loop at 60 frames per second
		var frameRate = 60.0;
		var frameDelay = 1000.0/frameRate;
		
		setInterval(function() {
			update(frameDelay);
		}, frameDelay);



